/* eslint-disable @next/next/no-img-element */
"use client";

import { Form } from "@repo/ui/components/ui/form";
import { useAuth } from "@/context/auth";
import { useWinery } from "@/context/winery";
import { wineFormSchema } from "@/data/form-schemas";
import { useAutosave } from "@/hooks/use-autosave";
import { db } from "@/lib/firebase/services/db";
import { storage } from "@/lib/firebase/services/storage";
import { DbResponse, Wine } from "@/types/db";
import { Timestamp } from "firebase/firestore";
import { LoaderCircle, Save } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Progress } from "@repo/ui/components/ui/progress";
import { Separator } from "@repo/ui/components/ui/separator";

import { useSystemVariables } from "@/context/system-variables";
import { useExtraValidations } from "@/hooks/use-extra-validations";
import { useKjAndKcal } from "@/hooks/use-kj-and-kcal";
import { useResponsiveSize } from "@/hooks/use-responsive-size";
import { toast } from "@repo/ui/hooks/use-toast";
import { base64ToImageFile } from "@/utils/image-utils";
import { cn } from "@/utils/shadcn";
import { zodResolver } from "@hookform/resolvers/zod";
import isEmpty from "lodash.isempty";
import { useRouter } from "next/navigation";
import { FileWithPath, useDropzone } from "react-dropzone";
import { QRCodeDialog } from "../dialogs/qrcode-dialog";
import { ImageCropper } from "@/components/widgets/image-cropper";
import { WineCarbohydratesField } from "./fields/wine/wine-carbohydrates-field";
import { WineCrudField } from "./fields/wine/wine-crud-field";
import { WineGrapeVarietiesField } from "./fields/wine/wine-grape-varieties-field";
import { WineNumberField } from "./fields/wine/wine-number-field";
import { WineSelectRawMaterialsField } from "./fields/wine/wine-select-raw-materials-field";
import { WineTextField } from "./fields/wine/wine-text-field";
import { WineTypeAndSweetnessField } from "./fields/wine/wine-type-and-sweetness-field";
import { WineSelectStringField } from "./fields/wine/wine-select-string-field";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

import PreviewDesktop from "../product/PreviewDesktop";
import PreviewMobile from "../product/PreviewMobile";

import SectionForm from "@/components/forms/section-add-form";

import {useFieldArray} from "react-hook-form";

import { 
  materialsBlocks, 
  ProductBlocks, 
} from '@/components/product/Data';

import type { DataProps } from "@/components/product/PreviewDesktop";
import { app } from "firebase-admin";

/*
 * Wine Form, with autosave every 20 sends and autosave onBlur event on each form field
 */

export interface WineFormProps {
  wine: Wine;
}

// function ScaledPreview({ children }: { children: React.ReactNode }) {
//   // scale factor 500 / 1400 ≈ 0.357
//   const SCALE = 500 / 1400

//   return (
//     <div
//       className="w-full h-[250px] overflow-y-auto overflow-x-hidden border rounded-lg"
//       style={{ position: 'relative' }}
//     >
//       <div
//         className="origin-top-left"
//         style={{
//           width: '1400px',
//           transform: `scale(${SCALE})`,
//           transformOrigin: '0 0',
//         }}
//       >
//         {children}
//       </div>
//     </div>
//   )
// }

function ScaledPreview({
  children,
  designWidth,
  wrapperWidth,
  wrapperHeight,
}: {
  children: React.ReactNode
  designWidth: number
  wrapperWidth: number
  wrapperHeight: number
}) {
  const scale = wrapperWidth / designWidth

  return (
    <div
      className={`
        overflow-y-auto overflow-x-hidden
        border rounded-lg
      `}
      style={{
        width: `${wrapperWidth}px`,
        height: `${wrapperHeight}px`,
      }}
    >
      <div
        className="origin-top-left"
        style={{
          width: `${designWidth}px`,
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
        }}
      >
        {children}
      </div>
    </div>
  )
}


export const WineForm = ({ wine }: WineFormProps) => {
  // * HOOKS
  const { t } = useTranslationHandler();
  const { user } = useAuth();
  const { winery } = useWinery();
  const { countries, wineTypes, volumes } = useSystemVariables();

  // Form setup
  const form = useForm<z.infer<typeof wineFormSchema>>({
    mode: winery?.settings?.autosave ? "onChange" : "onSubmit",
    resolver: zodResolver(wineFormSchema),
    defaultValues: {
      ...wine,
      sections: [
      {
        id: 'product',
        blocks: ProductBlocks,
      },
      {
        id: 'materials',
        containerClassName: 'mt-[100px]',
        blocks: materialsBlocks,
      },
    ],
    }
  });

  // const form = useFormContext();
  const router = useRouter();
  const { device } = useResponsiveSize();
  const { selectedWineType, selectedSweetness } = useExtraValidations(form);

  const { kj } = useKjAndKcal(
    parseFloat(wine.generalInfo.volume),
    parseFloat(wine.ingredients.sugar),
    parseFloat(wine.ingredients.alcoholByVolume),
  );

  // * STATES
  const [progress, setProgress] = useState<number>(0);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [mode, setMode] = useState<'desktop' | 'mobile'>('desktop')

  // configuration views
  const configs = {
    desktop: {
      designWidth: 1400,
      wrapperWidth: 500,
      wrapperHeight: 250,
      frameClasses: '',
    },
    mobile: {
      designWidth: 375,
      wrapperWidth: 400,
      wrapperHeight: 667,
      frameClasses: '', // phone frame styles
    },
  }

  const { designWidth, wrapperWidth, wrapperHeight, frameClasses } =
    configs[mode]

  // * REFS
  const mountRef = useRef<boolean>(false);

  // * HANDLERS

  const updateWineInDatabase = useCallback(
    (data: z.infer<typeof wineFormSchema>, status?: string) => {
      setSaving(true);

      // * UPDATE WINE
      // * Make sure to include the image's url
      // data.generalInfo.image = imageUrl;
      data.qrCode = qrCodeUrl;

      // data.nutritionalInfo.carbohydrates =
      //   data.nutritionalInfo.carbohydrates === ""
      //     ? data.ingredients.sugar
      //     : data.nutritionalInfo.carbohydrates;

      console.log(
        "ERRORS",
        form.formState.errors,
        isEmpty(form.formState.errors),
      );
      if (!user?.uid) return;
      db.wine
        .update(user?.uid, wine.id, {
          status: status || wine.status,
          lastUpdated: Timestamp.fromDate(new Date()),
          generalInfo: data.generalInfo,
          // profile: data.profile,
          // ingredients: data.ingredients,
          // nutritionalInfo: data.nutritionalInfo,
          isReadyToPublish: isEmpty(form.formState.errors),
        })
        .then((res: DbResponse) => {
          setSaving(false);

          if (winery && !winery.settings?.autosave) {
            toast({
              title: t("toasts.wines.wineSaved.title"),
              description: t("toasts.wines.wineSaved.description"),
            });
          }
        })
        .catch((error: DbResponse) => {
          console.log(error as any);
          setSaving(false);
        });
    },
    [qrCodeUrl, user?.uid, wine.id, wine.status, form.formState.errors, winery],
  );

  // * Submit form data to firestore
  const onSubmit = useCallback(
    (data: z.infer<typeof wineFormSchema>) => {
      updateWineInDatabase(data);
    },
    [updateWineInDatabase],
  );

  // * Upload image to storage and url to DB + update form with url data
  const handleImageUpload = (image: File) => {
    if (!user?.uid) return;
    // console.log("image", image);
    setImageUploading(true);
    storage.winery
      .upload(
        image,
        `wineries/${user?.uid}/wines/${wine.id}/`,
        (progress: any) => {
          setProgress(progress);
        },
        (error: any) => {
          console.log(error);
          setImageUploading(false);
        },
        (url: any) => {
          setImageUrl(() => url);
          form.setValue("generalInfo.image", url);
          onSubmit({
            ...(form.getValues() as z.infer<typeof wineFormSchema>),
            generalInfo: { ...form.getValues().generalInfo, image: url },
          });
          setImageUploading(false);
        },
      )
      .then(() => {
        // console.log("Uploaded");
      })
      .catch((error: any) => console.log(error));
  };

  const accept = {
    "image/*": [],
  };

  // * Image dropping over field
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      alert("Selected image is too large!");
      return;
    }

    const fileWithPreview = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    setSelectedFile(URL.createObjectURL(file));
    setDialogOpen(true);
  }, []);

  // * Dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  // * Handle cropped image
  const handleCroppedImage = (croppedImage: string) => {
    const croppedImageFile = base64ToImageFile(croppedImage, "test.png");
    handleImageUpload(croppedImageFile);
  };

  const handlePreview = () => {
    router.push(`/dashboard/products/preview-wine/${wine?.id}`);
  };

  // * on mount autopopulate form with DB data
  useEffect(() => {
    if (!mountRef.current && wine) {
      mountRef.current = true;
      setImageUrl(wine.generalInfo.image || "");
      setQrCodeUrl(wine.qrCode || "");
      // * autopopulate form by reseting it with wine values from DB
      form.reset({
      ...wine,
      sections: wine.sections ?? [
        {
          id: 'product',
          blocks: ProductBlocks,
        },
        {
          id: 'materials',
          containerClassName: 'mt-[100px]',
          blocks: materialsBlocks,
        },
      ],
    });
      // console.log("autopopulated", wine);
      form.setValue(
        "generalInfo.wineryName",
        wine.generalInfo.wineryName || winery?.info?.name || "",
      );
      form.trigger();
    }
  }, [wine]);

  // * Calculate KJ
  // useEffect(() => {
  //   if (kj) {
  //     form.setValue("nutritionalInfo.energy", kj.toString());
  //   }
  // }, [kj]);

  // * Autosave
  const { autosaveCount } = useAutosave(
    () => {
      if (winery && winery.settings?.autosave)
        onSubmit(form.getValues() as z.infer<typeof wineFormSchema>);
    },
    30,
    [],
  );

  // watched fields

  

  const { fields: sections, append, update, remove } = useFieldArray({
    control: form.control,
    name: 'sections',
  });

  function handleRemoveSection(id: string) {
  const idx = sections.findIndex(s => s.id === id);
  if (idx !== -1) remove(idx);
}

function handleUpdateSection(section: DataProps) {
  const idx = sections.findIndex(s => s.id === section.id);
  if (idx !== -1) update(idx, section);
}

  // useEffect(() => {
  //   if (winery) {
  //     console.log(winery?.settings as any);
  //   }
  // }, [winery]);

  return (
    <>
      <h2 className="text-xl font-semibold">
        General Information
      </h2>
      {/* * AVATAR */}
      <Card className="flex w-full flex-col items-start justify-start rounded-[8px] shadow-none">
        <CardHeader className="w-full">
          <div
            className={cn(
              device === "mobile"
                ? "flex flex-col items-center justify-center gap-4"
                : "flex items-center justify-between",
            )}
          >
            <div
              className={cn(
                device === "mobile"
                  ? "flex flex-col items-center justify-center gap-4"
                  : "flex h-full w-full items-center gap-4",
              )}
            >
              {imageUrl && (
                <>
                  {selectedFile && (
                    <ImageCropper
                      dialogOpen={isDialogOpen}
                      setDialogOpen={setDialogOpen}
                      selectedFile={selectedFile}
                      setSelectedFile={setSelectedFile}
                      onCroppedImage={(croppedImage: string) => {
                        handleCroppedImage(croppedImage);
                      }}
                    />
                  )}
                  {/* <Avatar
                    {...getRootProps()}
                    className="size-24 cursor-pointer ring-2 ring-slate-200 ring-offset-2"
                  >
                    <input {...getInputProps()} />
                    <AvatarImage src={imageUrl} alt="Winery Avatar" />
                    <AvatarFallback>
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar> */}
                  <div
                    {...getRootProps()}
                    className="size-24 max-h-24 max-w-24 cursor-pointer overflow-hidden rounded-md ring-2 ring-slate-200 ring-offset-2"
                  >
                    <input {...getInputProps()} />
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt=""
                        className="size-24 rounded-md transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-95"
                      />
                    )}
                  </div>
                </>
              )}
              <div
                className={cn(
                  device === "mobile"
                    ? "flex flex-col items-center justify-center gap-1"
                    : "space-y-1",
                )}
              >
                <CardTitle className="text-xl">
                  {"Product Image"}
                </CardTitle>
                <CardDescription className="text-sm">
                  {"This is product image as seen by others."}
                </CardDescription>
                <CardDescription className="text-sm">
                  {"Click over or drop an image to upload"}
                </CardDescription>
              </div>
            </div>
            <QRCodeDialog url={qrCodeUrl} />
          </div>
        </CardHeader>
        {imageUploading && (
          <CardFooter className="w-full">
            <Progress value={progress} />
          </CardFooter>
        )}
      </Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit as any)}>
          <div
            className={cn(
              device === "desktop"
                ? "grid w-full grid-cols-2 gap-6"
                : "flex w-full flex-col items-start justify-start gap-6",
            )}
          >
            {/* * Company NAME */}
            <WineTextField
              name="generalInfo.wineryName"
              label="Company Name"
              placeholder="Julia Allert"
              description="Enter your company's name as you wish it to be seen by others."
              form={form}
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
             
            {/* * COLLECTION NAME */}
            <WineTextField
              name="generalInfo.collectionName"
              label="Collection Name"
              placeholder="Black Dress"
              description="Enter the name of the collection you are creating."
              form={form}
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />

            {/* * VOLUME */}
            {/* <WineSelectStringField
              name="generalInfo.volume"
              label={t(
                "wineStepper.wineryDetails.generalInformation.volume.label",
              )}
              placeholder={t(
                "wineStepper.wineryDetails.generalInformation.volume.placeholder",
              )}
              description={t(
                "wineStepper.wineryDetails.generalInformation.volume.description",
              )}
              form={form}
              options={volumes}
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            /> */}
            {/* * TYPE OF WINE & SWEETNESS */}
            {/* <WineTypeAndSweetnessField
              form={form}
              selectedWineType={selectedWineType}
              wineTypes={wineTypes}
              selectedSweetness={selectedSweetness}
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            /> */}
            {/* *GRAPE VARIETIES */}
            {/* <WineGrapeVarietiesField
              form={form}
              name="generalInfo.grapeVarieties"
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            /> */}
            {/* *  product color */}
            <WineTextField
              name="generalInfo.cdo"
              label="Product Color"
              placeholder=""
              description=""
              onSubmit={onSubmit}
              form={form}
              autosave={winery?.settings?.autosave || true}
            />
            {/* * Preview component */}

            {/* <ScaledPreview>
              <Home />
            </ScaledPreview> */}

            <div className="space-y-2">
              <div className={`mx-auto ${frameClasses}`}>
                <ScaledPreview
                  designWidth={designWidth}
                  wrapperWidth={wrapperWidth}
                  wrapperHeight={wrapperHeight}
                >
                  { mode === 'desktop' 
                    ? <PreviewDesktop 
                        sections={(form.watch('sections') ?? []).filter((s): s is DataProps => !!s)} 
                        generalInfo={wine.generalInfo}
                      /> 
                    : <PreviewMobile />
                  }
                </ScaledPreview>
              </div>

              <button
                onClick={() => setMode(m => (m === 'desktop' ? 'mobile' : 'desktop'))}
                className="text-blue-600 hover:underline"
              >
                Switch to {mode === 'desktop' ? 'mobile' : 'desktop'} preview
              </button>
            </div>

            {/* * Product Code */}
            <WineTextField
              name="generalInfo.productCode"
              label="Product Code"
              placeholder=""
              description=""
              onSubmit={onSubmit}
              form={form}
              autosave={winery?.settings?.autosave || true}
            />
            
            {/* * Store Availability */}
            <WineTextField
              name="generalInfo.storeAvailability"
              label="Store Availability"
              placeholder=""
              description=""
              onSubmit={onSubmit}
              form={form}
              autosave={winery?.settings?.autosave || true}
            />
            {/* * Category */}
            <WineTextField
              name="generalInfo.category"
              label="Category"
              placeholder=""
              description=""
              onSubmit={onSubmit}
              form={form}
              autosave={winery?.settings?.autosave || true}
            />
            {/* * Image */}
            <WineTextField
              name="generalInfo.image"
              label="Image"
              placeholder="imageexample.png"
              description=""
              onSubmit={onSubmit}
              form={form}
              autosave={winery?.settings?.autosave || true}
            />
            <div />

            

          </div>
          {/* * SECTIONS editor */}

          <SectionForm 
            defaultSections={(form.watch('sections') ?? []).filter((s): s is DataProps => !!s)} 
          />


          {/* *SUBMIT BUTTON */}
          <div className="mt-6 w-full space-y-4">
            <Separator className="w-full" />
            {!winery?.settings?.autosave ? (
              <div className="flex w-full items-center justify-end gap-4">
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  onClick={() => onSubmit(form.getValues())}
                >
                  {saving ? (
                    <LoaderCircle
                      size={16}
                      className="animate-spin text-primary-foreground"
                    />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            ) : (
              <div
                className={cn(
                  device === "mobile"
                    ? "flex flex-col items-center justify-center gap-4"
                    : "flex w-full items-center justify-between gap-4",
                )}
              >
                <div className="flex min-w-fit items-center gap-2">
                  <div className="flex min-w-fit items-center gap-2">
                    <Save size={16} className="text-primary" />
                    <p className="text-xs font-medium text-muted-foreground">
                      Autosave enabled
                    </p>
                  </div>
                  <div className="flex min-w-[114px] items-center justify-center">
                    {saving ? (
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-xs text-muted-foreground">Saving</p>
                        <LoaderCircle
                          size={16}
                          className="animate-spin text-primary"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-4">
                        <p className="text-xs text-muted-foreground">
                          {`${"Saving"} ${autosaveCount.toString().padStart(2, "0")}
                          ${"seconds"}`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};
