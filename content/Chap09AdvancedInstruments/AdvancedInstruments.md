---
tags:
  - optical-instruments
  - advanced
  - applications
downloads:
  - id: chapter-09-pdf
    title: Download Chapter PDF
  - id: chapter-09-docx
    title: Download Chapter DOCX
---

(chapter:adv)=
# Advanced Optical Microscopes

```{note} What you should know and be able to do after studying this chapter
- Understand the fundamental resolution limits of optical microscopy and why shorter wavelengths alone cannot always improve resolution.
- Explain the principle of phase contrast microscopy and how it converts phase information into amplitude (intensity) information for imaging transparent objects.
- Describe the operation of a confocal microscope, including the role of the pinhole and focused illumination in achieving improved axial and lateral resolution.
- Understand how fluorescence microscopy works, including the use of fluorescent molecules (such as GFP) and dichromatic mirrors.
- Explain the principles of Scanning Near-Field Optical Microscopy (SNOM) and how it achieves super-resolution by detecting evanescent waves.
- Compare and contrast collection mode and excitation mode SNOM configurations.
- Recognize the limitations of each microscopy technique, including sample requirements and measurement artifacts.
```

Many attempts have been made and are still being made to achieve better images. An obvious way of improving the resolution is to use shorter wavelengths. However, at wavelengths below 200 nm (i.e. at deep, extreme ultraviolet, soft x-rays and hard x-rays) most materials have low optical contrast and refractive optics (lenses) are not practical. Instead of reducing the wavelength, other methods have been invented to achieve higher resolution. Some of these (certainly not all) are discussed in this chapter.
Apart from these already existing systems, research is continuing to achieve higher resolution. Pendry's paper on a superlens based on negative refraction[^1] has stimulated extensive research on super-resolution using metamaterials, in particular hyperbolic materials. We will not go into these topics here and instead refer interested students to the master course *Advanced Photonics*.

## Phase Contrast Microscope

Suppose we have a pure phase object $U_0(x,y)=e^{i\varphi(x,y)}$, i.e. an object that transmits light everywhere (a transparent object), but which shifts the phase of the light differently for different positions. An example of such an object is a biological cell. Since only the intensity can be measured and since $|U(x,y)|^2=1$ it contains in this case no meaningful information.
To obtain an image the field must be manipulated such that phase information is converted into amplitude information. If $\varphi(x,y)$ is small, we can show that this can be done by Fourier transforming $U(x,y)$, shifting the phase of the Fourier transform in the point $(k_x,k_y)=(0,0)$ by $\pi/2$, and inverting the Fourier transform. Shifting the Fourier transform of $U(x,y)$ in $(0,0)$ gives

$$
\mathcal{F}(U)\left(\xi,\eta\right)\to \mathcal{F}(U)(\xi,\eta)+(i-1)\delta(\xi,\eta)\mathcal{F}(U)(0,0).
$$

This shift can be realized with a phase mask in the pupil of the lens.
Inverse Fourier transforming gives

$$
\begin{aligned}
\mathcal{F}(U)(\xi,\eta)+(i-1)\delta(\xi,\eta)\mathcal{F}(U)(0,0) &\to U(x,y)+(i-1)\mathcal{F}(U)(0,0) \\
& =e^{i\varphi(x,y)}+(i-1)\mathcal{F}(U)(0,0).
\end{aligned}
$$

This is the field in the image focal plane of the lens. Its intensity is

$$
\begin{aligned}
I(x,y)&=|e^{i\varphi(x,y)}+(i-1)\mathcal{F}(U)(0,0)|^2 \\
&= 1+2\mathcal{F}(U)(0,0)^2-2\mathcal{F}(U)(0,0)\cos(\varphi(x,y))+2\mathcal{F}(U)(0,0)\sin(\varphi(x,y)),
\end{aligned}
$$

where we assume without loss of generality that $\mathcal{F}(U)(0,0)$ is real (a constant phase shift can be chosen such that $\mathcal{F}(U)(0,0)$ is real).
We see that indeed the phase information can now be measured as intensity information, because of the phase shift applied to the Fourier transform of $U(x,y)$ in one point[^2]. Assuming that $\varphi(x,y)$ is small, and neglecting the higher-order term $\hat{U}(0,0)^2$, we can write

$$
I(x,y)\approx 1+2\mathcal{F}(U)(0,0)\varphi(x,y).
$$

Phase contrast microscopy requires thin samples.

## Confocal Microscope
A confocal microscope is an optical microscope which is able to record images with a very small depth of focus (~400 nm). By translating the focal plane through the object, it is possible to get a 3D representation of the object. A computer is then needed for the reconstruction.
The technique is shown in {numref}`fig:adv:confocal`, extracted from the patent filed by Minsky in 1957.

The idea is to illuminate the object with a tightly focused spot, using an objective lens. The object reflects the laser spot and the reflected light is imaged by the same objective. A small pinhole is put in front of the detector in the image plane. The spot is scanned laterally and the total image is obtained by processing all the images for all the lateral scan positions.
As is illustrated in {numref}`fig:adv:confocal`, by using a focused spot for the illumination in conjunction with a pinhole in front of the detector, only the photons very close to the focal plane pass the pinhole and are detected. This means that the axial resolution of the images is roughly 600 nm when light with a wavelength of 400 nm is used, which is better than with bright field illumination and conventional detection. The illumination by a focused spot implies that the sample is illuminated by a field with large lateral spatial frequencies. Because the reflected near field is the product of the incident spot and the reflection function, high spatial frequencies of the reflection function can be transmitted by the lens, due to the convolution in the Fourier domain between the Fourier-transformed incident spot and the transformed reflection function. The lateral resolution is therefore also increased from around 200 nm to 160 nm, i.e. by a factor around 1.2. The confocal microscope thus gives higher resolution both in the axial and in the lateral direction. It can of course only be applied to an object that does not change during the time required to scan.


```{figure} Images/09_01_confocal.png
:name: fig:adv:confocal
Schematic of a confocal microscope and its principle
```


```{figure} Images/09_02_confocal_1euro.png
:name: fig:adv:confocalEuro
Partial surface profile of a 1 Euro coin, measured with a Nipkow disk confocal microscope. *Source Wikipedia*
```


## Fluorescence Microscope

In this case, fluorescent molecules, such as those of the GFP (green fluorescent protein) family, are introduced in the cell of interest. The light from the illuminating source is monochromatic (laser) and excites these GFP molecules which then re-emit at a characteristic longer wavelength. By using a dichroic mirror (a mirror that passes only a certain color and reflects the rest), this re-emitted light can be detected using a detector with a pinhole. One obtains colorful images such as the one presented in {numref}`fig:adv:flurorescence`. The advantage of fluorescence microscopy is that the sources of the fluorescence light are inside the sample and that by selective binding of the fluorescent molecules to particular organelles very specific images can be obtained.


```{figure} Images/09_03_fluorescent_cells.jpg
:name: fig:adv:flurorescence
Endothelial cells under the microscope using fluorescence microscopy. The different colors highlight different fluorescent markers.
```


## Scanning Near-Field Optical Microscope

As we have discussed earlier, when an object is illuminated,
high spatial frequency components of the transmitted and reflected near field that contain information about sub-wavelength features cannot reach the detector in far field microscopy, because the waves corresponding to high spatial frequencies are evanescent. This implies that features smaller than the wavelength cannot be detected using conventional far field microscopy. By putting a high refractive index fluid such as oil between the sample and the objective lens, the effective wavelength is reduced by the refractive index and hence the resolution is improved. This is called immersion microscopy.


But to achieve superresolution, i.e. the detection of features that are substantially below the wavelength, it is necessary that the information contained in at least part of the evanescent waves is in some way detected. This is done in a SNOM (**Scanning Near-Field Optical Microscope**). There are two methods to achieve superresolution. The first method is illustrated at the left of {numref}`fig:adv:snom`. The sample is illuminated and the scattered field is detected using a sub-wavelength tip on a fiber that directs the locally scattered light to a detector. The sample is laterally scanned by the sub-wavelength tip, which is almost in contact with the sample and therefore is sensitive to sub-wavelength details in the scattered field.

The second method is shown at the right of {numref}`fig:adv:nsom`. A fiber with sub-wavelength tip is now used to illuminate the sample from a very small distance, while the detection is done with a conventional objective. It may at first seem strange that the detected far field contains information about sub-wavelength features of the object and hence provides superresolution images. The superresolution is however due to the fact that the illumination consists in part of evanescent waves.
The two set-ups in {numref}`fig:adv:snom` are reciprocal to each other and they give similar resolution enhancement.

```{figure} Images/09_04_nsom_collection.jpg
:name: fig:adv:snom
Collection (left) and Excitation (right) mode for a SNOM.
```


On the left in {numref}`fig:adv:nsom` a topographic atomic force microscopy (AFM) image is shown of a Photonics Band Gap (PBG) structure; next to it is an NSOM image measured with a collecting fiber set-up.

A warning is appropriate.
Because in SNOM the fiber is very close to the sample, either to illuminate the sample or to collect the scattered near field, the fiber in general will influence the measurement, i.e. the field that one wants to detect is to a certain extent perturbed by the measuring device.

```{figure} Images/09_05_nsom_image_a.jpg
:name: fig:adv:nsom
Left: Topographic AFM image of a Photonics Band Gap (PBG) structure, imaged with a 150 nm AFM/NSOM cantilevered probe. Right: NSOM image of the PBG structure using a laser with a wavelength of 532 nm.
```

## Chapter Summary

- **Diffraction limit** constrains conventional optical microscopy to a resolution of approximately $0.61\lambda/\text{NA}$.
- **Phase contrast microscopy** converts phase differences (in transparent samples) into intensity variations using a phase plate.
- **Confocal microscopy** uses point illumination and a pinhole detector to achieve optical sectioning and improved axial resolution.
- **Fluorescence microscopy** uses fluorescent labels (e.g., GFP) that emit at longer wavelengths than excitation; dichroic mirrors separate excitation and emission.
- **Confocal fluorescence microscopy** combines fluorescence with confocal sectioning for 3D imaging of biological samples.
- **Scanning Near-Field Optical Microscopy (SNOM)** achieves super-resolution by detecting evanescent waves using a sub-wavelength probe.
- **Collection mode SNOM**: A sub-wavelength tip collects the near field while the sample is illuminated from far field.
- **Excitation mode SNOM**: A sub-wavelength tip illuminates the sample, and far-field detection captures super-resolved information.
- **Immersion microscopy** improves resolution by using high refractive index fluids to reduce the effective wavelength.
- All near-field techniques require the probe to be very close to the sample, which may perturb the measurement.

[^1]: Phys Rev. Lett. **85**, 3966, 2000

[^2]: See also Hecht &sect; 13.2.4 '*Phase Contrast*'.
