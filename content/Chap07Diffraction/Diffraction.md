---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.16.7
kernelspec:
  display_name: Python 3
  language: python
  name: python3
tags:
  - diffraction
  - wave-optics
  - advanced
  - theory
  - experimental
downloads:
  - id: chapter-07-pdf
    title: Download Chapter PDF
  - id: chapter-07-docx
    title: Download Chapter DOCX
---

(chapter:diff)=
# Scalar Diffraction Optics


```{note} What you should know and be able to do after studying this chapter
- Be able to derive the angular spectrum decomposition, also known as the plane wave expansion, and understand its physical interpretation.
- Know the Rayleigh-Sommerfeld formula; in particular be able to write down the integral over spherical waves with amplitudes proportional to the field in the starting plane.
- Know how to deduce the Fresnel and Fraunhofer approximations of the Rayleigh-Sommerfeld integral and understand their relation to the Fourier transformation.
- Understand intuitively in what sense the Fourier transform is linked to resolution.
- Understand why propagation of light leads to loss of resolution (i.e. the evanescent waves disappear).
- Understand why propagation to the focal plane of a lens corresponds to taking the Fourier transform.
- Understand how the Numerical Aperture (NA) of a lens ultimately determines the resolution of images.
- Understand how a lens can be used for Fourier filtering.
```

## Introduction
In this chapter we will study how light propagates as a wave. In the study of the double-slit experiment we concluded from the interference pattern observed on a screen that light is a wave. To demonstrate more convincingly that light is indeed a wave, we require a detailed quantitative model of the propagation of light, which gives experimentally verifiable predictions.

But a precise description of the propagation of light is not only important for fundamental science; it also has many practical applications. For example, if a sample must be analysed by illuminating it and measuring the scattered light, the fact that the detected light has been affected not only by the sample but also by propagation has to be taken into account. Another example is lithography. If a pattern has to be printed onto a substrate using a mask that is illuminated and there is a certain distance between the mask and the photoresist, the light which reaches the resist does not have the exact shape of the mask due to propagation effects. Thus, the mask needs to be designed to compensate for these effects.
```{figure} Images/07_01_propagation_example.png
:name: fig:diff:propagationExample
A quantitative model of the propagation of light is required to predict the properties of propagation and to apply it in sample analyses and lithography.
```

From electromagnetic theory, we know that in homogeneous matter (i.e. the
permittivity is constant), every component $U$ of a time-harmonic
electromagnetic field satisfies the scalar Helmholtz {eq}`eq:diff:helmholtz`:

```{math}
:label: eq:diff:helmholtz
\begin{align*}
\left( \nabla ^2 + k^2\right) U(\mathbf{r})=0,
\end{align*}
```
where $k=\omega\sqrt{\epsilon \mu_0}$ is the wave number of the light in matter with permittivity $\epsilon$ and refractive index $n=\sqrt{\epsilon/\epsilon_0}$.

When the refractive index is not constant, Maxwell's equations are no longer equivalent to the wave equation for the individual electromagnetic field components and there is then coupling between the components due to the curl operators in Maxwell's equation. When the variation of the refractive index is slow on the scale of the wavelength, the scalar wave equation may still be a good approximation, but for structures that vary on the scale of the wavelength (i.e. on the scale of ten microns or less), the scalar wave equation is not sufficiently accurate.

## Propagation of light through a homogeneous medium
We will describe two equivalent methods to compute the propagation of the field through homogeneous matter, namely the angular spectrum method and the Rayleigh-Sommerfeld diffraction formula. Our goal is to derive the field at some point $(x,y,z)$ with $z>0$, given the field in the plane $z=0$, as is illustrated in {numref}`fig:diff:propagationMath`.
Although both methods in the end describe the same, they give physical insight into different aspects of propagation.

(sec:diff:angularspectrum)=
### Angular Spectrum Method


```{figure} Images/07_02_propagation_math.png
:name: fig:diff:propagationMath
Given the field $U(x,y,0)$, we want to find $U$ at a point $(x,y,z)$ with $z>0$. It is assumed that the field propagates in the positive $z$-direction, which means that all sources are in the region $z<0$.
```


```{math}
:label: eq:diff:fourierField
\begin{align*}
\mathcal{F}(U_0)(\xi,\eta) = \int\!\int U_0(x,y) e^{-2\pi i(\xi x + \eta y)} \, \text{d}x \text{d} y,
\end{align*}
```
The inverse Fourier transform implies:

```{math}
:label: eq:diff:fourierInverse
\begin{align*}
U_0(x,y)&= \int\!\int {\cal F}(U_0)(\xi,\eta) e^{2\pi i (\xi x + \eta y)}\, \text{d}\xi \text{d} \eta \\
&= \mathcal{F}^{-1}\{{\cal F}(U_0)\}(x,y).
\end{align*}
```
The Fourier transform has important properties that are essential for this analysis.
By defining $k_x=2\pi \xi$, $k_y=2\pi \eta$, {eq}`eq:diff:fourierInverse` can be written as

```{math}
:label: eq:diff:fourierWavevector
\begin{align*}
U_0(x,y)= \frac{1}{4\pi^2} \int\!\int {\cal F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right) e^{ i (k_x x + k_y y)}\, \text{d} k_x \text{d} k_y.
\end{align*}
```
The variables in the Fourier plane: $(\xi,\eta)$ and $(k_x, k_y)$ are called **spatial frequencies**.

{eq}`eq:diff:fourierWavevector` says that we can write $U_0(x,y)=U(x,y,z=0)$ as an integral (a
sum) of plane waves[^1] with wave vector $\mathbf{k}=(k_x,k_y, k_z)^T$, each
with its own weight (i.e. complex
amplitude) ${\cal F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)$.
We know how each plane wave with complex amplitude ${\cal F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)$ and wave vector $\mathbf{k}=(k_x,k_y,k_z)^T$ propagates over a distance $z>0$

```{math}
\begin{align*}
{\cal F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)e^{i (k_x x + k_y y)} \to \mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right) e^{i (k_x x + k_y y + k_z z)},
\end{align*}
```
Therefore, the field $U(x,y,z)$ in the plane $z$ (for some $z>0$) is given by


```{math}
:label: eq:diff:planeWave
\begin{align*}
U(x,y,z)=\frac{1}{4\pi^2} \int\int {\cal F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)e^{i (k_x x + k_y y+k_z z)} \,\text{d}k_x\,\text{d}k_y,
\end{align*}
```

where

```{math}
:label: eq:diff:kzComponent
\begin{align*}
k_z =\sqrt{\left(\frac{2\pi }{\lambda}\right)^2-k_x^2-k_y^2},
\end{align*}
```
with $\lambda$ the wavelength of the light as measured **in the material** (hence, $\lambda=\lambda_0/n$, with $\lambda_0$ the wavelength in vacuum).
The sign in front of the square root in {eq}`eq:diff:kzComponent` could in principle be chosen negative: one would then also obtain a solution of the Helmholtz equation. The choice of the sign of $k_z$ is determined by the direction in which the light propagates, which in turn depends on the location of the sources **and** on the convention chosen for the time dependence. We have to choose here the + sign in front of the square root because the sources are in $z<0$ and the time dependence of time-harmonic fields is (as always in this book) given by $e^{-i\omega t}$ with $\omega >0$.

{eq}`eq:diff:planeWave` can be written alternatively as

```{math}
\begin{align*}
U(x,y,z)=\mathcal{F}^{-1}\{\mathcal{F}(U_0)(\xi,\eta)e^{i k_z z}\}(x,y),
\end{align*}
```
where now $k_z$ has to be considered as a function of $(\xi, \eta)$:

```{math}
:label: eq:diff:kzSpatialFreq
\begin{align*}
k_z = 2\pi \sqrt{ \left( \frac{1}{\lambda}\right)^2- \xi^2-\eta^2}.
\end{align*}
```
Note that one can interpret this as a diagonalisation of the propagation operator.

We can observe something interesting: if $k_x^2+k_y^2 > \left(\frac{2\pi }{\lambda}\right)^2$, then $k_z$ becomes imaginary, and $\exp(i k_z z)$ decays exponentially for increasing $z$:

```{math}
:label: eq:diff:evanescent
\begin{align*}
\exp\left\{i\left[k_x x+k_y y +z\sqrt{\left(\frac{2\pi n}{\lambda}\right)^2-k_x^2-k_y^2 }\right]\right\}=e^{i(k_x x+k_y y)}e^{-z\sqrt{ k_x^2+k_y^2- \left(\frac{2\pi n}{\lambda}\right)^2} }.
\end{align*}
```
These exponentially decaying waves are called **evanescent in the positive $z$-direction**. We have met evanescent waves already in the context of total internal reflection. The physical consequences of evanescent waves in the angular spectrum decomposition are important for understanding diffraction limits.

The waves for which $k_z$ is real have constant amplitude: only their phase changes due to propagation. These waves therefore are called **propagating waves**.
```{figure} Images/07_03_angular_spectrum.png
:name: fig:diff:angularSpectrum
The spatial frequencies $k_x$, $k_y$ of the plane waves in the angular spectrum of a time-harmonic field which propagates in the $z$-direction. There are two types of waves: the propagating waves with spatial frequencies inside the circle $\sqrt{k_x^2+k_y^2}<k=2\pi/\lambda $ and which have phase depending on the propagation distance $z$ but constant amplitude, and the evanescent waves for which $\sqrt{k_x^2+k_y^2}>k$ and of which the amplitude decreases exponentially during propagation.
```


**Remark**. In homogeneous space, the scalar Helmholtz equation for every electric field component is equivalent to Maxwell's equations and hence we may propagate each component $E_x$, $E_y$ and $E_z$ individually using the angular spectrum method. If the data in the plane $z=0$ of these field components are physically consistent, the electric field thus obtained will automatically satisfy the condition that the electric field is free of divergence, i.e.

```{math}
:label: eq:diff:divergenceFree
\begin{align*}
\mathbf{\nabla} \cdot \mathbf{E}=0,
\end{align*}
```
everywhere in $z>0$.
This is equivalent to the statement that the electric vectors of the plane waves in the angular spectrum are perpendicular to their wave vectors.
Alternatively, one can propagate only the $E_x$- and $E_y$-components and afterwards determine $E_z$ from the condition that {eq}`eq:diff:divergenceFree` must be satisfied.


(sec:diff:rayleighsommerfeld)=
### Rayleigh-Sommerfeld Diffraction Integral

Another method to propagate a wave field is by using the **Rayleigh-Sommerfeld** integral. A very good approximation of this integral states that each point in the plane $z=0$ emits spherical waves with amplitude proportional to the field in the plane $z=0$. To find the field at a point $(x, y,z)$, we have to add the contributions from all these point sources together. This corresponds to the Huygens-Fresnel principle postulated earlier in the Spatial Coherence section of the Interference chapter. Because a more rigorous derivation starting from the Helmholtz equation[^2] would be rather lengthy, we will just give the final result:

````{important}
**Rayleigh-Sommerfeld Diffraction Integral**
```{math}
:label: eq:diff:rayleighSommerfeld
\begin{align*}
U(x,y,z)&= \frac{1}{i\lambda}\int\int U_0(x',y')\frac{ z \, e^{ik\sqrt{(x-x')^2+(y-y')^2+z^2}}}{(x-x')^2+(y-y')^2+z^2}\,\text{d}x'\,\text{d}y'
&= \frac{1}{i\lambda}\int\int U_0(x',y')\frac{z}{r} \frac{e^{ikr}}{r}\,\text{d}x'\,\text{d}y',
\end{align*}
```
````

where we wrote again $U_0(x,y)=U(x,y,0)$ and where

```{math}
:label: eq:diff:distanceDefinition
\begin{align*}
r=\sqrt{(x-x')^2+(y-y')^2+z^2}.
\end{align*}
```
**Remarks**.

1. The formula {eq}`eq:diff:rayleighSommerfeld` is not completely rigorous because a term that is a factor $1/(kr)$ smaller (and which in practice therefore is very much smaller) has been omitted.

2. In {eq}`eq:diff:rayleighSommerfeld` there is an additional factor
$z/r$ that has been omitted in the standard time-harmonic spherical wave formulation. This factor means that the amplitudes of the spherical waves in the Rayleigh-Sommerfeld diffraction integral depend on direction (although their wave fronts are spherical), the amplitudes being largest in the forward direction.

3. The angular spectrum method amounts to a multiplication by $\exp(i z k_z)$ in Fourier space, while the Rayleigh-Sommerfeld integral is a convolution with respect to $(x,y)$. It is a property of the Fourier transform that a multiplication in Fourier space corresponds to a convolution in real space and vice versa. Indeed a mathematical result called **Weyl's identity** implies that the rigorous Rayleigh-Sommerfeld formulation and the plane wave expansion (i.e. the angular spectrum method) give identical results.

(sec:diff:fourierintuition)=
## Intuition for the Spatial Fourier Transform in Optics

Since spatial Fourier transformations play an important role in our discussion of the propagation of light, it is important to understand them not just mathematically, but also intuitively.

What happens when an object is illuminated and the reflected or transmitted light is detected at some distance from the object? Let us look at transmission for example. When the object is much larger than the wavelength, a transmission function $\tau(x,y)$ is often defined and the field transmitted by the object is then assumed to be simply the product of the incident field and the function $\tau(x,y)$. For example, for a hole in a metallic screen with diameter large compared to the wavelength, the transmission function would be 1 inside the hole and 0 outside. However, if the object has features of the order of the wavelength, this simple model of multiplying by a transmission function breaks down and the transmitted field must instead be determined by solving Maxwell's equations. This is not easy, but some software packages can do it.

Now suppose that the transmitted electric field has been obtained in a plane $z=0$ very close to the object (a distance within a fraction of a wavelength). This field is called the **transmitted near field** and it may have been obtained by simply multiplying the incident field with a transmission function $\tau(x,y)$ or by solving Maxwell's equations. This transmitted near field is a kind of footprint of the object.
But it should be clear that, although it is quite common in optics to speak in terms of "imaging an object", strictly speaking we do not image an object as such, but we image the transmitted or reflected near fields which are a kind of copy of the object.
After the transmitted near field has been obtained, we apply the angular spectrum method to propagate the individual plane waves through homogeneous matter (e.g. air) from the object to the detector plane or to an optical element like a lens.

Let $U_0(x,y)=U(x,y,0)$ be a component of the transmitted near field.
The first step is to Fourier transform it, by which the field component is decomposed into plane waves.
To each plane wave, characterized by the wave numbers $k_x$ and $k_y$, the Fourier transform assigns a complex amplitude
$\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)$, the magnitude of which indicates how important the role is which this particular wave plays in the formation of the near field. So what can be said about the object field $U_0(x,y)$,
by looking at the magnitude of its spatial Fourier transform $|\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)|$?

Suppose $U_0(x,y)$ has sharp features, i.e. there are regions where $U_0(x,y)$ varies rapidly as a function of $x$ and $y$. To describe these features as a combination of plane waves, these waves must also vary rapidly as a function of $x$ and $y$, which means that the length of their wave vectors $\sqrt{k_x^2+k_y^2}$ must be large. Thus, the sharper the features that $U_0(x,y)$ has, the larger we can expect
$|\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)|$ to be for large $\sqrt{k_x^2+k_y^2}$, i.e. high spatial frequencies can be expected to have large amplitude. Similarly, the slowly varying, broad features of $U_0(x,y)$ are described by slowly fluctuating waves, i.e. by
$\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)$ for small $\sqrt{k_x^2+k_y^2}$, i.e. for low spatial frequencies. This is illustrated in {numref}`fig:diff:spatialFourierTransform`.

To investigate these concepts further we choose a certain field, take its Fourier transform, remove the higher spatial frequencies and then invert the Fourier transform. We then expect that the resulting field has lost its sharp features and only retains its broad features, i.e. the image is blurred. Conversely, if we remove the lower spatial frequencies but retain the higher, then the result will only show its sharp features, i.e. its contours. These effects are shown in {numref}`fig:diff:fourierFilter`.
Recall that when $k_x^2+k_y^2 > \left(\frac{2\pi}{\lambda}\right)^2$, the plane wave decays exponentially as the field propagates. Because by propagation through homogeneous space, the information contained in the high spatial frequencies corresponding to evanescent waves is lost (only exponentially small amplitudes of the evanescent waves remain), perfect imaging is impossible, no matter how well-designed an optical system is.

```{important}
**Diffraction Limit**: Propagation of light leads to irrecoverable loss of resolution.
```

It is this fact that motivates near-field microscopy, which tries to detect these evanescent waves by scanning close to the sample, thus obtaining subwavelength resolution.

So we have seen how we can guess properties of some object field $U_0(x,y)$ given the amplitude of its spatial Fourier transform $|\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)|$. But what about the phase of $\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)$? Although one cannot really guess properties of $U_0(x,y)$ by looking at the phase of $\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)$ the same way as we can by looking at its amplitude, it is in fact the phase that plays a larger role in defining $U_0(x,y)$. This is illustrated in {numref}`fig:diff:fourierPhase`: if the amplitude information of $\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)$ is removed, features of the original $U_0(x,y)$ may still be retrieved. However, if we only know the amplitude $|\mathcal{F}(U_0)(k_x,k_y)|$ but not the phase, then the original object is completely lost. Thus, the phase of a field $\mathcal{F}(U_0)$ is very important, arguably often more important than its amplitude. However, we cannot measure the phase of a field directly, only its intensity $I=|\mathcal{F}(U_0)|^2$ from which we can calculate the amplitude $|\mathcal{F}(U_0)|$. It is this fact that makes **phase retrieval** an entire field of study on its own: how can we find the phase of a field, given that we can only perform intensity measurements? This question is related to a new field of optics called "lensless imaging", where amplitudes and phases are retrieved from intensity measurements and the image is reconstructed **computationally**. Interesting as this topic may be, we will not treat it in these notes and refer instead to master courses in optics [^3].

**Remark**. The importance of the phase for the field can also be seen by looking at the plane wave expansion {eq}`eq:diff:planeWave`. We have seen that the field in a plane $z=\text{constant}$ can be obtained by propagating the plane waves by multiplying their amplitudes by the phase factors $\exp(i z k_z)$, which depend on the propagation distance $z$. If one leaves the evanescent waves out of consideration (since after some distance they hardly contribute to the field anyway), it follows that only the phases of the plane waves change upon propagation, while their amplitudes (the moduli of their complex amplitudes) do not change. Yet, depending on the propagation distance $z$, widely differing light patterns are obtained (see e.g. {numref}`fig:diff:fresnelFraunhoferSlit`).


```{figure} Images/07_04_spatial_fourier_transform.png
:name: fig:diff:spatialFourierTransform
A qualitative interpretation of spatial Fourier transforms. The low spatial frequencies (i.e. small $\sqrt{k_x^2+k_y^2}$) represent slow fluctuations, and therefore contribute to the broad features of the real-space object. The high spatial frequencies (i.e. large $\sqrt{k_x^2+k_y^2}$) fluctuate rapidly, and can therefore form sharp features in the real-space object.
```

```{figure} Images/07_05_remove_high.png
(a) Removing the high spatial frequencies

```
```{figure} Images/07_06_remove_low.png
:name: fig:diff:fourierFilter
(b) Removing the low spatial frequencies

Demonstration of the roles of different spatial frequencies. By removing the high spatial frequencies, only the broad features of the image remain and resolution is lost. If the low spatial frequencies are removed, only the sharp features (i.e. the contours) remain.
```

```{figure} Images/07_07_remove_amp.png
(a) Removing the amplitude information by setting the amplitude of propagating and evanescent waves to 1 and 0, respectively.
```
```{figure} Images/07_08_remove_phase.png
:name: fig:diff:fourierPhase
(b) Removing the phase information by setting the phase equal to 0.

Demonstration of the role of the phase of the spatial Fourier transform. If the amplitude information is removed, but phase information is kept, some features of the original image are still recognizable. However, if the phase information is removed but amplitude information is kept, the original image is completely lost.
```


Another aspect of the Fourier transform is the **uncertainty principle**. It states that many waves of different frequencies have to be added to get a function that is confined to a small space[^4]. Stated differently, if $U(x,y)$ is confined to a very small region, then $\mathcal{F}(U)(k_x,k_y)$ must be very spread out. This can also be illustrated by the scaling property of the Fourier transform:

```{math}
\begin{align*}
\text{if} \quad h(x)=f(ax) \quad \text{then} \quad \mathcal{F}(h)\left(\frac{k_x}{2\pi}\right)=\frac{1}{|a|}\mathcal{F}(f)\left(\frac{k_x}{2\pi a}\right),
\end{align*}
```
which simply states that the more $h(x)$ is squeezed by increasing $a$, the more its Fourier transform
$\mathcal{F}(h)$ spreads out. This principle is illustrated in {numref}`fig:diff:uncertainty`. The uncertainty principle is familiar from quantum physics where it is stated that a particle cannot have both a definite momentum and a definite position. In fact, this is just one particular manifestation of the uncertainty principle just described. A quantum state $|\psi\rangle$ can be described in the position basis $\psi_{x}(x)$ as well as in the momentum basis $\psi_p(p)$. The basis transformation that links these two expressions is the Fourier transform

```{math}
\begin{align*}
\psi_p(p)=\mathcal{F}\{\psi_x(x)\}(p).
\end{align*}
```
Hence, the two are obviously subject to the uncertainty principle! In fact, any two quantum observables which are related by a Fourier transform (also called conjugate variables), such as position and momentum, obey this uncertainty relation.
The **uncertainty relation** states:

```{note}
If a function $f(x)$ has width $\Delta x$, its Fourier transform has a width $\Delta k_x \approx 2\pi/ \Delta x$.
```

Since after propagation over a distance $z$,
the evanescent waves do not contribute to the Fourier transform of the field, it follows that this Fourier transform has maximum width $\Delta k_x = k$. By the uncertainty principle it follows that after propagation, the minimum width of the field is $\Delta x, \Delta y \approx 2\pi/k=\lambda$.
```{note}
The minimum feature size of a field after propagation is of the order of the wavelength.
```

This poses a fundamental limit to resolution given by the wavelength of the light.

```{figure} Images/07_09_uncertainty_principle.png
:name: fig:diff:uncertainty
Demonstration of the uncertainty principle. The more confined $U(x,y)$ is, the larger the spread of $\mathcal{F}(U)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)$.
```


(sec:diff:fresnelfraunhofer)=
## Fresnel and Fraunhofer Approximations

The Fresnel and Fraunhofer approximations are two approximations of the Rayleigh-Sommerfeld integral {eq}`eq:diff:rayleighSommerfeld`. The approximations are accurate provided the propagation distance $z$ is sufficiently large. In the Fraunhofer approximation, $z$ has to be *quite* large, i.e. larger than for the Fresnel approximation, which is already accurate for typical distances occurring in optical systems. Putting it differently: in order of most accurate to least accurate (i.e. only valid for large propagation distances), the diffraction integrals would rank as:

```{note}
**[Most accurate]** Rayleigh-Sommerfeld $\rightarrow$ Fresnel $\rightarrow$ Fraunhofer **[Least accurate]**.
```

### Fresnel Approximation

We assume that $z$ in {eq}`eq:diff:rayleighSommerfeld` is so large that in the denominator we can
approximate $r$ by $z$:

```{math}
:label: eq:diff:fresnel1
\begin{align*}
U(x,y,z)&= \frac{1}{i\lambda}\int\int U_0(x',y')\frac{z}{r} \frac{e^{ikr}}{r}\,\text{d}x'\,\text{d}y'
&\approx & \frac{1}{i\lambda z}\int\int U_0(x',y')e^{ikr}\,\text{d}x'\,\text{d}y'.
\end{align*}
```
The reason why we can not apply the same approximation for $r$ in the exponent is that in the exponent $r$ is multiplied by $k= 2\pi /\lambda$, which is a very large number at optical frequencies, so any error introduced by approximating $r$ would be drastically magnified by multiplying by $k$ which can easily lead to a completely different value of $\exp(ikr)=\cos(kr)+i\sin(kr)$. To approximate $r$ in $\exp(ikr)$ we must be more careful and apply a Taylor expansion. Recall that

```{math}
:label: eq:diff:distanceApprox
\begin{align*}
r&= \sqrt{(x-x')^2+(y-y')^2+z^2}
&= z\, \sqrt{\frac{(x-x')^2+(y-y')^2}{z^2}+1}.
\end{align*}
```
We know that the Taylor expansion around $s=0$ implies:

```{math}
:label: eq:diff:paraxialApprox
\begin{align*}
\sqrt{s+1}=1+\frac{s}{2}-\frac{s^2}{8}+\dots.
\end{align*}
```
Since we assume that $z$ is large, $\frac{(x-x')^2+(y-y')^2}{z^2}$ is small, so we have

```{math}
:label: eq:diff:fresnel2
\begin{align*}
r&= z\sqrt{\frac{(x-x')^2+(y-y')^2}{z^2}+1}
&\approx& z\left[1+\frac{(x-x')^2+(y-y')^2}{2 z^2}\right]
&= z+\frac{(x-x')^2+(y-y')^2}{2 z}, \quad \quad**Fresnel approximation**.
\end{align*}
```
With this approximation, we arrive at the **Fresnel diffraction integral**, which can be written in the following equivalent forms:


```{math}
:label: eq:diff:fresnelIntegral
\begin{align*}
\begin{split}
U(x,y,z) &\approx
\frac{e^{ikz}}{i\lambda z}\int\!\int U_0(x',y')e^{\frac{ik}{2z}\left[(x-x')^2+(y-y')^2\right]}\,\text{d}x'\,\text{d}y' \\
&=
\frac{ e^{ikz}e^{\frac{ik(x^2+y^2)}{2z}}}{i\lambda z}\int\!\int U_0(x',y') e^{\frac{ik(x'^2+y'^2)}{2z}}e^{-ik\left(\frac{x}{z}x'+\frac{y}{z}y'\right)}\,\text{d}x'\,\text{d}y' \\
&= \frac{e^{ikz}e^{\frac{ik(x^2+y^2)}{2z}}}{i\lambda z} \mathcal{F}\left\{U_0(x',y')e^{\frac{ik(x'^2+y'^2)}{2z}}\right\}\left(\frac{x}{ \lambda z },\frac{y}{\lambda z}\right)
\end{split}
\end{align*}
```

Especially the last expression is interesting, because it shows that

```{note}
The Fresnel approximation is proportional to the Fourier transform of the field $U_0(x',y')$ multiplied by the Fresnel propagator $\exp\left(\frac{ik(x'^2+y'^2)}{2z}\right)$.
```

Note that this propagator depends on the distance of propagation $z$.

**Remark**. By Fourier transforming {eq}`eq:diff:fresnelIntegral`, one can get the plane wave amplitudes of the Fresnel approximation.
It turns out that these amplitudes are equal to ${\cal F}(U_0)$ multiplied by a phase factor which is obtained from a paraxial approximation of the exact phase factor $\exp(i z k_z)$, i.e. $k_z$ is approximated by a quadratic function of $k_x, k_y$. Therefore the Fresnel approximation is also called the paraxial approximation. In fact, it can be shown that the Fresnel diffraction integral is a solution of the
**paraxial wave equation** and conversely, that every solution of the paraxial wave equation can be written as a Fresnel diffraction integral[^5].


### Fraunhofer Approximation
To obtain the Fraunhofer approximation, we will make one further approximation to $r$ in $\exp(ikr)$ in addition to the Fresnel approximation:

```{math}
:label: eq:diff:fresnelDistance
\begin{align*}
r
&\approx & z+\frac{(x-x')^2+(y-y')^2}{2 z} \quad\mathbf{Fresnel approximation} \end{align*}
```
```{math}
:label: eq:diff:fraunhoferDistance
\begin{align*}
&\approx & z+\frac{x^2+y^2-2xx'-2yy'}{2 z} \quad\mathbf{Fraunhofer approximation}.\end{align*}
```
Hence we have omitted the quadratic terms $x'^2+y'^2$, and in comparison with the Fresnel diffraction integral, we omit the factor $ \exp\left[ik(x'^2+y'^2)/(2z)\right]$ to obtain the **Fraunhofer diffraction integral**:


```{math}
:label: eq:diff:fraunhoferIntegral
\begin{align*}
U(x,y,z)\approx \frac{e^{ikz}e^{\frac{ik(x^2+y^2)}{2z}}}{i\lambda z} \mathcal{F}(U_0)\left(\frac{x }{ \lambda z},
\frac {y}{\lambda z }\right).
\end{align*}
```

This leads to the following important observation:

```{note}
The Fraunhofer far field of $U_0(x',y')$ is proportional to the Fourier transform of $U_0$.
```

Note that to obtain the Fraunhofer field in $(x,y,z)$, the Fourier transform has to be evaluated at spatial frequencies $x/(\lambda z)$ and $y/(\lambda z)$. These spatial frequencies scale with $1/z$ and the overall field $U(x,y,z)$ is proportional to $1/z$. This implies that when $z$ is increased the field pattern spreads out without changing its shape while its amplitude goes down so that the total energy is preserved. Stated differently, apart from the factor $1/z$ in front of the integral, the Fraunhofer field depends on the angles $x/z$ and $y/z$. Therefore for large propagation distances $z$ for which the Fraunhofer approximation is accurate, the field becomes broader (it diverges) when the propagation distance increases.

```{note}
Eventually, for sufficiently large propagation distances, i.e. in the Fraunhofer limit, light always spreads out without change of shape of the light distribution.
```

**Remarks**.

1. The Fresnel approximation is, like the Fraunhofer approximation, a Fourier transform of the field in the starting plane ($z=0$), evaluated in spatial frequencies which depend on the point of observation:

```{math}
:label: eq:diff:spatialFrequency
\begin{align*}
\xi = \frac{x}{\lambda z}, \quad \eta=\frac{y}{\lambda z}.
\end{align*}
```
However, in contrast to the Fraunhofer approximation, the Fresnel approximation depends additionally in a different way on the propagation distance $z$, namely through the exponent of the Fresnel propagator in the integrand.
Therefore the Fresnel approximation gives quite diverse patterns depending on the propagation distance $z$, as is shown in {numref}`fig:diff:fresnelFraunhoferSlit`.


2. In the Rayleigh-Sommerfeld diffraction integral, the field is written as a superposition of spherical waves. In the Fresnel approximation the spherical waves are approximated by parabolic waves. Finally, in the Fraunhofer approximation the propagation distance is so large that the parabolic waves can be approximated by plane waves.


3. Let $f_{a,b}(x,y)=f(x-a,y-b)$ be the function obtained from $f$ by translation. From the general property of the Fourier transform:

```{math}
\begin{align*}
{\cal F}(f_{a,b})(\xi,\eta) = e^{ -2\pi i (\xi a + \eta b)} {\cal F}(f)(\xi,\eta),
\end{align*}
```
it follows that when the field $U_0$ is translated, the intensity in the Fraunhofer far field is not changed.
In contrast, due to the additional quadratic phase factor in the integrand of the Fresnel integral, the intensity of the Fresnel field in general changes when $U_0$ is translated.

4. Suppose that $U_0$ is the field immediately behind an aperture ${\cal A}$ with diameter $D$ in an opaque screen. It can then be shown that points $(x,y,z)$ of observation, for which the Fresnel and Fraunhofer diffraction integrals are sufficiently accurate, satisfy:

```{math}
:label: eq:diff:fresnelCondition
\begin{align*}
\frac{z}{\lambda} & \gg & \left( \frac{\max_{(x',y')\in{\cal A}}\sqrt{(x-x')^2+(y-y')^2}}{\lambda}\right)^{4/3}, \;\; \mathbf{Fresnel} \end{align*}
```
```{math}
:label: eq:diff:fraunhoferCondition
\begin{align*}
\\
\frac{z}{\lambda} & \gg & \left( \frac{D}{\lambda}\right)^{2}, \;\; \mathbf{Fraunhofer}\end{align*}
```
The Fresnel number is defined by


```{math}
:label: eq:diff:fresnelNumber
\begin{align*}
N_F = \frac{D^2}{\lambda z}, \;\;\; \mathbf{Fresnel number}.
\end{align*}
```

When $N_F < 0.1$ the Fraunhofer approximation is accurate, while for $N_F>0.1$ it is better to use the Fresnel approximation (see {numref}`fig:diff:fresnelFraunhoferSlit`).
Suppose that $D= 1~\text{mm}$ and the wavelength is that of green light: $\lambda=550~\text{nm}$. Then Fraunhofer's approximation is accurate if $z> 10~\text{m}$.


5. The points of observation where the Fraunhofer approximation can be used must in any case satisfy:

```{math}
:label: eq:diff:farFieldCondition
\begin{align*}
\frac{x}{z} < 1, \quad \frac{y}{z} <1.
\end{align*}
```
When $x/z>1$, the spatial frequency $k_x = \frac{2 \pi x}{z \lambda} > k$ associated with this point corresponds to an evanescent wave. An evanescent wave obviously cannot contribute to the Fraunhofer far field because it exponentially decreases with distance $z$. In practice the Fresnel and Fraunhofer approximations are used only when $x/z$ and $y/z$ are smaller than 0.3.

6. In any expression for an optical field, one may always omit factors of constant phase, i.e. an overall phase which does not depend on position. If one is only interested in the field in certain planes $z=\text{constant}$, then a factor like $\exp(ikz)$ may also be omitted. Further, in some cases also a position dependent phase factor in front of the Fresnel and Fraunhofer diffraction integrals is omitted, namely when only the intensity is of interest. In exercises it is usually mentioned that this factor may be omitted: if this is not stated, it should be retained in the formulae.

(sec:diff:examples)=
### Examples of Fresnel and Fraunhofer approximations

**Fresnel approximation of the field of two point sources.**

Consider two mutually coherent time-harmonic point sources in $\mathbf{r}_s^+=(a/2,0,0)$ and $\mathbf{r}_s^-=(-a/2,0,0)$. The fields in $\mathbf{r}=(x,y,z)$ emitted are according to the time-harmonic field equation (see the {ref}`Interference chapter <chapter:coh>`) proportional to

```{math}
:label: eq:diff:pointSourceField
U_{\pm}(\mathbf{r}) = \frac{e^{i k |\mathbf{r}-\mathbf{r}_s^\pm|}}{|\mathbf{r} -\mathbf{r}_s^\pm|}.
```

We apply the Fresnel approximation for large $z$:

```{math}
:label: eq:diff:fresnelPointSource
\begin{align*}
|\mathbf{r}-\mathbf{r}_s^\pm| &= z \sqrt{ 1 + \frac{(x∓ a/2)^2 + y^2}{z^2}}  \\
& \approx & z + \frac{(x∓ a/2)^2 + y^2}{2 z}  \\
&= z + \frac{x^2+ y^2+a^2/4}{2z} ∓ \frac{a x}{2z}.
\end{align*}
```
Hence,

```{math}
:label: eq:diff:fresnelField
U_\pm(\mathbf{r}) \approx \frac{e^{ikz}}{z} e^{i k \frac{x^2+y^2}{2z} } e^{ i k\frac{ a^2}{8z}} \, e^{∓ i k \frac{a x}{2z}},
```

where in the denominator we replaced $|\mathbf{r}-\mathbf{r}_s^\pm|$ by $z$. Note that the Fraunhofer approximation amounts to $e^{ i k a^2/(8z)} \approx 1$ while the phase factor $e^{i k \frac{x^2+y^2}{2z} } $ remains. The intensity on a screen $z=\text{constant}$ of the sum of the two fields for the case that the sources have equal strength and emit in phase is:

```{math}
:label: eq:diff:totalIntensity
\begin{align*}
I_{tot}(\mathbf{r}) &= | U_+(\mathbf{r})+U_{-}(\mathbf{r}) |^2 = \frac{1}{z^2} |e^{-i k \frac{a x}{2z}} + e^{i k \frac{a x}{2z}}|^2  \\
&= \frac{2}{z^2} \left[ 1 + \cos\left(2 \pi \frac{a x}{\lambda z}\right)\right].
\end{align*}
```
It is seen that the intensity results from the interference of two plane waves: $\exp[\pm i k ax/(\lambda z)]$ and is given by a cosine function (see {numref}`fig:diff:pointSource`).
Note that for two point sources, the intensity pattern is the same in the Fresnel and the Fraunhofer approximation. However, this is special for two point sources: when more than two point sources are considered, the Fresnel and Fraunhofer patterns are different. The intensity pattern is independent of $y$, and vanishes on lines


```{math}
:label: eq:diff:brightFringes
\begin{align*}
\frac{x}{z} = (2m+1)\frac{\lambda}{2a},
\end{align*}
```
and has maxima on lines

```{math}
:label: eq:diff:darkFringes
\begin{align*}
\frac{x}{z} = m\frac{\lambda}{a},
\end{align*}
```
for integer $m$.
```{figure} Images/07_10_point_source_light.png
:name: fig:diff:pointSource
Intensity pattern of two mutually coherent point sources of equal strength and emitting in phase at the wavelength $\lambda =600$&nbsp;nm from {eq}`eq:diff:totalIntensity`. The distance between the point sources is 200&nbsp;nm. At the top, the cross-section along the $z$-axis is shown.
```


**Fraunhofer approximation of a rectangular aperture in a screen.**

Let the screen be $z=0$ and the aperture be given by $-a/2 < x < a/2$, $-b/2 < y < b/2$. The transmission function $\tau(x,y)$ is:

```{math}
:label: eq:diff:slitTransmission
\begin{align*}
\tau(x,y)= 1_{[-a/2,a/2]}(x) 1_{[-b/2, b/2]}(y),
\end{align*}
```
where

```{math}
:label: eq:diff:indicatorFunction
\begin{align*}
1_{[-a/2, a/2]}(x) = \left\{ \begin{array}{l}1, \text{ if } -\frac{a}{2} \leq x \leq\frac{a}{2}, \\0, \text{ otherwise},
\end{array}\right.
\end{align*}
```
and similarly for $1_{[-b/2, b/2]}(y)$.
Let the aperture be illuminated by a perpendicular incident plane wave with unit amplitude. Then the field immediately behind the screen is:

```{math}
:label: eq:diff:slitField
\begin{align*}
U_0(x,y)=\tau(x,y) = 1_{[-a/2,a/2]}(x) 1_{[-b/2, b/2]}(y),
\end{align*}
```
We have

```{math}
:label: eq:diff:slitFourier
\begin{align*}
{\cal F}\left( 1_{[-a/2,a/2] }\right)(\xi) &= \int_{-a/2}^{a/2} e^{-2\pi i\xi x} \, \text{d} x  \\
&= \frac{ e^{\pi i a \xi}-e^{-\pi i a\xi}}{2\pi i \xi}  \\
&= a \text{ sinc}(\pi a \xi),
\end{align*}
```
where $\text{ sinc}(u)=\sin(u)/u$.
Hence,

```{math}
:label: eq:diff:rectangularAperture
\begin{align*}
{\cal F}(U_0)\left(\frac{x}{\lambda z},\frac{y}{\lambda z}\right) = a b \text{ sinc}\left(\frac{\pi a x}{\lambda z}\right) \text{ sinc}\left(\frac{\pi b y}{\lambda z}\right).
\end{align*}
```
The Fraunhofer far field at large distance $z$ from a rectangular aperture in a mask is obtained by substituting {eq}`eq:diff:rectangularAperture` into {eq}`eq:diff:fraunhoferIntegral`.

**Remarks**.

1. The first zero along the $x$-direction from the center $x=0$ occurs for

```{math}
:label: eq:diff:zeroCondition
\begin{align*}
x= \pm \frac{\lambda z}{a}.
\end{align*}
```
The distance between the first two zeros along the $x$-axis is $2\lambda z/a$ and is thus larger when the width along the $x$-direction of the aperture is smaller.

2. The inequalities {eq}`eq:diff:farFieldCondition` imply that when $ a< \lambda$, the far field pattern does not have any zeros as a function of $x$. When $a$ is further decreased it becomes more and more difficult to deduce the width $a$ from the Fraunhofer intensity. This is an illustration of the fact that information about features that are smaller than the wavelength cannot propagate to the far field.

3. As illustrated in {numref}`fig:diff:fraunhofer`, the Fraunhofer diffraction pattern as a function of diffraction angle is narrowest in the direction in which the aperture is widest.

```{figure} Images/07_11_fraunhofer_diffraction_aperture.png
:name: fig:diff:fraunhofer
Fraunhofer diffraction pattern of a rectangular aperture in an opaque screen. Left: the width of the aperture in the $y$-direction is twice that in the $x$-direction; middle: the width in the $y$-direction is 5 times that in the $x$-direction; right: the width in the $y$-direction is 10 times that in the $x$-direction.
```


**Fresnel approximation of a rectangular aperture in a mask**

The integral in the Fresnel approximation for the field of a rectangular aperture in a mask can be computed analytically and leads to functions that are actually called "Fresnel integrals" which can be studied using the Cornu spirals. We will not go deeper in this matter but simply show the results of the simulations in
{numref}`fig:diff:fresnelFraunhoferSlit`. The distance to the mask increases ($N_F$ decreases), from very close to the mask at the bottom right, to further from the mask at the bottom left, to rather far from the mask in the upper right, to Fraunhofer distance in the upper left figures. Note the change in scale along the axis in the figures and the decrease of intensity with propagation distance. It is seen that the pattern changes and broadens drastically with distance from what is more or less a copy of the aperture, to a pattern that is equal to the Fourier transform of the aperture. Once the Fraunhofer approximation is accurate, a further increase of distance only results in a widening of the pattern and a decrease of overall amplitude without change of shape. In contrast, in the region where the Fresnel approximation is accurate, the shape of the pattern is seen to change a lot with distance to the mask.


+++


```{figure} Images/07_12_fresnel_diffraction_l_distance.png
:name: fig:diff:fresnelFraunhoferSlit
Diffraction patterns of a square opening in a mask with corresponding cross-sections along the $x$-axis, showing the transition from Fresnel to Fraunhofer approximations. The distance to the mask increases as the Fresnel number $N_F$ decreases from the near field pattern close to the mask in the right bottom figures to the Fraunhofer diffraction pattern in the upper left. Note the different scales along the axis in the figures.
```


**Fraunhofer approximation of a periodic array of slits**

We can now predict the diffraction pattern of an array of slits of finite width.
It follows from the Fraunhofer pattern of a single rectangular aperture that, if the sides parallel to the $y$-direction are very long, the Fraunhofer diffraction pattern as a function of angle in the $y$-direction is very narrow.
In {numref}`fig:diff:fraunhofer`b the Fraunhofer diffraction pattern of a rectangular aperture is shown, of which the width in the $y$-direction is 10 times the width in the $x$-direction. The diffraction pattern is then strongly concentrated along the $x$-axis.
If we only consider the Fraunhofer pattern for $y/z=0$ while still considering it as a function of $x/z$, it suffices to compute the Fourier transform only with respect to $x$. The problem then becomes a diffraction problem for a one-dimensional slit.

We consider now an array of such slits of which the long sides are all parallel to the $y$-axis and we neglect from now on the $y$-variable.
Suppose $W_{\text{slit}}(x)$ is the function that describes the transmission of a single slit. Then the transmission function of $M$ equidistant slits is

```{math}
\begin{align*}
\tau(x)=\sum_{m=1}^{M} W_{\text{slit}}\left(x+ (M+1)\frac{p}{2}- mp\right),
\end{align*}
```
where $p$ is the distance between neighbouring slits, i.e. $p$ is the period of the row. If the illumination is by a perpendicular incident plane wave with unit amplitude, the transmitted near field $U_0(x)$ is simply $\tau(x)$.
Then

```{math}
:label: eq:diff:gratingSum
\begin{align*}
{\cal F}(U_0)(\xi) = {\cal F}(\tau)(\xi)=\sum_{m=1}^M {\cal F}(W_{slit})(\xi)\, e^{\pi i (M+1)p\xi } e^{-2\pi i m p \, \xi},
\end{align*}
```
where for a slit with width $a$ we have according to {eq}`eq:diff:slitFourier`:

$$
{\cal F}(W_{slit})(\xi) = a \frac{\sin(\pi a \xi)}{\pi a \xi}.
$$
There must obviously hold $a< p$.
Using

```{math}
:label: eq:diff:geometricSeries
\begin{align*}
\sum_{m=1}^M e^{-2\pi i m p \, \xi } &= e^{-2\pi i p\xi } \frac{ 1- e^{-2\pi i M p \, \xi}}{1-e^{-2\pi i p \, \xi}}  \\
&= e^{-\pi i (M +1) p \, \xi}\, \frac{ e^{i \pi M p \, \xi} - e^{-i \pi M p \, \xi}}{e^{i \pi p \, \xi}- e^{-i \pi p \, \xi}}  \\
&= e^{-\pi i (M+1) p \, \xi} \, \frac{ \sin( \pi Mp \, \xi)}{\sin(\pi p \, \xi)},
\end{align*}
```
we get

```{math}
:label: eq:diff:gratingFourierTransform
{\cal F}(U_0)(\xi) =
{\cal F}(W_{slit})(\xi) \frac{\sin( \pi M p \xi)}{ \sin(\pi p \xi)}.
```

The intensity of the Fraunhofer far field is:

```{math}
:label: eq:diff:gratingFourier
\begin{align*}
I(x,z)= \left| \frac{1}{\lambda z}\mathcal{F}(U_0)\left(\frac{x}{\lambda z}\right) \right|^2 = \frac{1}{\lambda^2 z^2}\,
\left|{\cal F}(W_{slit})\left(\frac{\theta}{\lambda}\right)\right|^2 \,
\frac{\sin^2\left( \pi M\frac{p}{\lambda} \, \theta \right)}{ \sin^2\left(\pi \frac{p}{\lambda}\, \theta \right)}.
\end{align*}
```
where $\theta=x/z$ is the diffraction angle. The factor

```{math}
:label: eq:diff:fastOscillation
\frac{\sin^2\left( \pi M \frac{p}{\lambda} \, \theta \right)}{ \sin^2\left(\pi \frac{p}{\lambda}\, \theta \right)},
```

is, due to the factor $M$ in the sine argument in the numerator, a fast oscillating function of $\theta$ while $|{\cal F}(W_{slit})(\theta/\lambda)|^2$ is a slowly varying envelope.
This is a manifestation of the property of the Fourier transform that small details of a structure (e.g. the size of a single slit) cause large scale features of the far field pattern, whereas large scale properties such as the length $M p$ of the total structure cause quickly changing features. This is illustrated in {numref}`fig:diff:multipleSlits712`.

The diffraction amplitude is maximum for angles where both the denominator and numerator of {eq}`eq:diff:fastOscillation` vanish:


```{math}
:label: eq:diff:gratingOrderm
\begin{align*}
\theta_m= \frac{ m \lambda}{ p },\;\;\; m=0,\pm1, \pm 2, \ldots, \hspace{0.6cm} \mathbf{diffraction orders.}
\end{align*}
```

These directions are called diffraction orders and since

```{math}
:label: eq:diff:maxIntensity
\frac{\sin^2\left( \pi M\frac{p}{\lambda} \, \theta_m \right)}{ \sin^2\left(\pi \frac{p}{\lambda}\, \theta_m \right)} = M^2,
```

which follows by applying l'H\^{o}pital's rule, the intensity of the m$^{th}$ order is

```{math}
\begin{align*}
\frac{M^2}{\lambda^2 z^2} \, \left| {\cal F}(W_{slit})\left(\frac{m}{p}\right) \right|^2,
\end{align*}
```
hence it is proportional to the square of the number of periods and to the squared modulus of the envelope in $\theta_m$.

Between two adjacent diffraction orders, {eq}`eq:diff:fastOscillation` has $M-1$ zeros and $M-2$ secondary maxima (see {numref}`fig:diff:multipleSlits712`).
The angular width of a diffraction order is half the angular distance to the nearest zeros next to the order, i.e.


```{math}
:label: eq:diff:orderWidth
\begin{align*}
\Delta \theta = \frac{\lambda}{M p},
\hspace{1cm} \mathbf{angular width of a diffraction order.}
\end{align*}
```

If there are more slits the intensity peaks into which the energy is diffracted are narrower and the peaks are higher.
```{figure} Images/07_13_multiple_slits712.png
:name: fig:diff:multipleSlits712
An illustration of a diffraction pattern of a series of five slits.
```


As explained above, there holds in the Fraunhofer far field: $\theta= x/z<1$. This sets a limit to the number of diffracted orders:

```{math}
:label: eq:diff:finiteGrating
\begin{align*}
|m|\leq p/\lambda.
\end{align*}
```
Hence, the larger the ratio of the period and the wavelength, the more diffraction orders.

The property {eq}`eq:diff:gratingOrderm` that the diffraction orders $ m\neq 0$ depend on wavelength is used to separate wavelengths. **Grating spectrometers** use periodic structures such as an array of slits to very accurately separate and measure wavelengths. The $m$th diffraction orders of two wavelengths $\lambda_1$ and $\lambda_2>\lambda_1$ are just separated if

$$
m\frac{\lambda_2}{p} > m\frac{\lambda_1}{p} + \Delta \theta =
m\frac{\lambda_1}{p } + \frac{\lambda_1}{M p},
$$
which implies with $\Delta \lambda=\lambda_2-\lambda_1$ and $\lambda=\lambda_1$ that

```{math}
:label: eq:diff:gratingResolution
\frac{\Delta \lambda}{\lambda}> \frac{1}{m M}.
```

It follows that the resolution is higher when there are more slits and for a larger diffraction order. However, the disadvantage of using higher diffraction orders is that often their intensity is less.
For a grating with 1000 periods one can obtain a resolution of $\Delta \lambda/\lambda =10^{-3}$ in the first order.

It should be remarked that a grating is obtained for any periodic variation of the refractive index. If the proper transmission function for the unit cell of the grating is substituted for $W_{slit}$, the formulae above also give the Fraunhofer far field of such more general diffraction gratings. By changing the unit cell, the envelope of the diffraction pattern can be changed and a certain order can be given more intensity. In {numref}`fig:diff:blazedGrating` a so-called blazed grating is shown which is used in reflection and which has a strong first diffracted order for a certain angle of incidence.
```{figure} Images/07_14_blazed_grating.png
:name: fig:diff:blazedGrating
Diffraction grating used in reflection with a so-called blazed unit cell.
```


**Remark**. A periodic row of slits is an example of a diffraction grating. A grating is a periodic structure, i.e. the refractive index is a periodic function of position.
Structures can be periodic in one, two and three directions.
A crystal acts as a three-dimensional grating whose period is the period of the crystal, which typically is a few Angstroms.
Electromagnetic waves with wavelength less than one Angstrom are called x-rays. When a beam of x-rays illuminates a crystal, a detector in the far field measures the Fraunhofer diffraction pattern given by the intensity of the Fourier transform of the refracted near field. These diffraction orders of crystals for x-rays were discovered by Von Laue and are used to study the atomic structure of crystals.

```{openlyceum} OpticsLab
:screen: 4
:label: fig:diff-optics-lab-grating-sim

Transmission and reflection gratings on an optical bench. Change the grating period and the illuminating wavelength and watch the diffracted orders move — a geometric-optics preview of the far-field grating condition used for crystals and for laboratory diffraction gratings.
```

## Fraunhofer Diffraction Revisited

```{phet} wave-interference
:screen: 4
:label: fig:diff-wave-interference-sim

An aperture and the far-field pattern it produces, with size, shape, and wavelength adjustable. Everything narrow in the aperture is wide in the pattern — the $\theta\sim\lambda/a$ scaling of Fraunhofer diffraction, seen whole rather than one angle at a time.
```

Fraunhofer diffraction patterns can qualitatively be explained by considering directions in which destructive and constructive interferences occur.
Consider two mutually coherent point sources $S_1$, $S_2$ on the $x$-axis as shown in {numref}`fig:diff:twoSources`. We assume that these point sources are in phase. On a screen at large distance $z$ an interference pattern is observed. If the distance $z$ of the screen is very large, the spherical wave fronts emitted by the point sources are almost plane at the screen and the field is the Fraunhofer far field of the two point sources. At point $P$ on the screen at a distance $x$ above the $z$-axis the optical path difference of the waves emitted by the two sources is approximately given by $S_2Q=a \theta$, where $\theta=x/z$ is assumed small. Hence constructive interference occurs for angles $\theta$ such that
$S_2Q=m\lambda$ for some integer $m$, i.e. when

```{math}
:label: eq:diff:constructive
\begin{align*}
\theta = m \frac{\lambda}{a}, \hspace{1cm} \text{constructive interference}.
\end{align*}
```
Destructive interference occurs when the path length difference satisfies $S_2Q=\lambda/2 + m \lambda$ for some integer $m$, hence for angles

```{math}
:label: eq:diff:destructive
\begin{align*}
\theta = ( 1/2 + m)\frac{\lambda}{a} \hspace{1cm} \text{destructive interference}.
\end{align*}
```
If the point sources have the same strength, their fields perfectly cancel for these angles.

```{figure} Images/07_15_2_sources.png
:name: fig:diff:twoSources
Interference of two mutually coherent point sources. For $z$ very large points $P$ where constructive and destructive interference occurs are such that for some integer $m$: $S_2Q=m \lambda$ and $S_2Q=(1/2 + m) \lambda$, respectively.
```


Now consider a slit as shown in {numref}`fig:diff:slits` which is illuminated by a perpendicular incident plane wave.
By the Huygens-Fresnel principle, the field at a screen far from the slit is the sum of the fields of point sources in the aperture, with strengths proportional to the field in the slit at the position of the point sources. When the slit is illuminated by a plane wave at perpendicular incidence, all point sources are in phase and have equal strength. Divide the slit into two equal halves as shown in {numref}`fig:diff:slits`.
The point sources in the slit can be arranged into pairs, of which one point source is in the upper half of the slit and the other is at the equivalent position (at distance $a/2$ from the other point source) in the lower half of the slit. Let $\theta$ be an angle for which the two point sources of a pair cancel each other i.e.

```{math}
:label: eq:diff:destructive2
\begin{align*}
\theta= (1/2+ m) \frac{\lambda}{a/2} = (1+ 2m)\frac{\lambda}{a},
\end{align*}
```
since the distance between the point sources is $a/2$.
By translating the pair of point sources through the slits, it follows that both half slits perfectly cancel each other for these angles. In this way we have found the angles $\theta = m\lambda/a$ with $m$ odd for which destructive interference occurs. Destructive interference for $m$ even can be derived by further subdivisions of the aperture.

```{figure} Images/07_16_slit.png
:name: fig:diff:slits
By dividing the slit into two slits of size $a/2$ each and considering pairs of point sources of which one is in the upper half of the slit and the other is at the corresponding position in the lower half, angles where destructive interference occurs between these point sources lead to minima in the diffraction pattern. Note that the point sources have corresponding positions in the two parts of the slit if their distance is $a/2$.
```


In general it is easier to find the angles for which the far field vanishes than to find (local) maxima of the field. An exception is the case of a diffraction grating. It follows from {numref}`fig:diff:grating` that there will be constructive interference between adjacent periods, and hence for all periods, for angles for which the distance $SQ$ in {numref}`fig:diff:grating` is a multiple of the wavelength, i.e. for

```{math}
:label: eq:diff:gratingOrder
\begin{align*}
\theta = m \frac{\lambda}{p},
\end{align*}
```
which corresponds to the direction of the diffraction orders. For other angles the phases of the fields of the different periods differ widely and therefore the fields almost cancel at these angles when there are many periods. This explains that for a diffraction grating of many periods, the far field intensity is highly concentrated in particular directions given by the orders {eq}`eq:diff:gratingOrder` which depend only on the ratio of the wavelength and the period.
```{figure} Images/07_17_grating.png
:name: fig:diff:grating
If the angle $\theta$ is such that $SQ$ is a multiple of the wavelength, two adjacent periods, and hence all periods of the grating, constructively interfere. These angles correspond to the diffraction orders.
```


## Fourier Optics
In this section we apply diffraction theory to a lens.
We consider in particular the focusing of a parallel beam and the imaging of an object.

### Focusing of a Parallel Beam
A lens induces a local phase change to an incident field in proportion to the local thickness of the lens. Let a plane wave which propagates parallel to the optical axis be incident on a positive lens. In Gaussian geometrical optics the incident rays are all focused into the image focal point. According to the Principle of Fermat, all rays have traveled the **same optical distance** when they intersect in the image focal point where they constructively interfere and cause an intensity maximum. The wavefronts are in the focal region parts of **spheres with center the focal point** and cut off by the cone with the focal point as top and opening angle $2 a/f$, as shown in {numref}`fig:diff:focusingLens`. Behind the focal point, there is a second cone with again spherical wavefronts, but there the light is propagating *away* from the focal point. According to Gaussian geometrical optics it is in image space completely dark outside of the two cones in {numref}`fig:diff:focusingLens`. However, as we will show, in diffraction optics this is not true.

We assume that the lens is thin and choose as origin of the coordinate system the center of the thin lens with the positive $z$-axis along the optical axis. Let $f_i$ be the $z$-coordinate of the image focal point according to Gaussian geometrical optics. Then $(0,0,f_i)$ is the image focal point. Let $(x,y,z)$ be a point between the lens and this focal point. According to geometrical optics the field in $(x,y,z)$ is proportional to

```{math}
:label: eq:diff:sphericalWave
\left\{
\begin{array}{lr}
\frac{e^{- i k \sqrt{x^2 + y^2 + (z-f_i)^2}-i\omega t}}{\sqrt{x^2 + y^2 + (z-f_i)^2}},
&\text{if } (x,y,z) \text{ is inside the cone}, \\
0,
&\text{ if } (x,y,z) \text{ is outside the cone},
\end{array}\right.
```

where we have included the time-dependence. Indeed the surfaces of constant phase:

```{math}
\begin{align*}
-\sqrt{x^2 + y^2 + (z-f_i)^2}-\omega t=\text{constant},
\end{align*}
```
are spheres with center the focal point. For increasing time, these spheres converge to the focal point, while the amplitude increases as the distance to the focal point decreases, so that energy is preserved.

**Remark**.
For a point $(x,y,z)$ to the **right** of the focal point, i.e. for $z>f_i$, the spherical wave fronts propagate away from the focal point and therefore there $-ik$ should be replaced by $+ik$ in the exponent in {eq}`eq:diff:sphericalWave`.


The exit pupil of the lens is in the plane $z=0$ where, according to {eq}`eq:diff:sphericalWave`, the field is

```{math}
:label: eq:diff:lensTransmission1
\begin{align*}
1_{⊙_a}(x,y) \frac{e^{-i k \sqrt{x^2 + y^2 + f_i^2}}}{
\sqrt{ x^2 + y^2 + f_i^2}},
\end{align*}
```
where the time dependence has been omitted and

```{math}
\begin{align*}
1_{⊙_a}(x,y)= \left\{ \begin{array}{l}1 \;\;\; \text{ if } x^2+y^2< a^2, \\0 \;\;\; \text{ otherwise}
\end{array}
\right.
\end{align*}
```
i.e. $1_{⊙_a}(x,y)=1$ for $(x,y)$ in the exit pupil of the lens and $=0$ otherwise.
If $a/f_i$ is sufficiently small, we may replace the distance $\sqrt{x^2 +y^2 + f_i^2}$ between a point in the exit pupil and the image focal point in the denominator of {eq}`eq:diff:lensTransmission1` by $f_i$. This is not allowed in the exponent, however, because of the multiplication by the large wave number $k$. In the exponent we therefore use instead the first two terms of the Taylor series {eq}`eq:diff:paraxialApprox`:

```{math}
:label: eq:diff:paraxialLens
\begin{align*}
\sqrt{x^2 + y^2 + f_i^2} = f_i \sqrt{ 1 + \frac{x^2 + y^2 }{f_i^2}} \approx f_i + \frac{x^2 + y^2}{2f_i},
\end{align*}
```
which is valid for $a/f_i$ sufficiently small. Then {eq}`eq:diff:lensTransmission1` becomes:

```{math}
:label: eq:diff:lensTransmission2
\begin{align*}
1_{⊙_a}(x,y) e^{-i k \frac{x^2 + y^2}{2 f_i}},
\end{align*}
```
where we dropped the constant factors $e^{i k f_i}$ and $1/f_i$.
For a general field $U_0(x,y)$ incident on the lens, i.e. in the entrance pupil, the lens applies a transformation such that the field in the exit plane becomes:\\

```{math}
:label: eq:diff:lensFieldOutput
\begin{align*}
& U_0(x,y) \to U_0(x,y) 1_{⊙_a}(x,y) e^{- i k \frac{x^2 + y^2}{2 f_i}}, \end{align*}
```

The function that multiplies $U_0(x,y)$ is the **transmission function of the lens**:

```{math}
:label: eq:diff:lensTransform
\begin{align*}
\tau_{\text{lens}}(x,y) = 1_{⊙_a}(x,y) e^{-ik \frac{x^2 + y^2}{2 f_i}}.
\end{align*}
```
This result makes sense: in the center $(x,y)=0$ the lens is thickest, so the phase is shifted the most
(but we can define this phase shift to be zero because only phase *differences* matter, not absolute phase).
As is indicated by the minus-sign in the exponent, the further you move away from the center of the lens, the less the phase is shifted. For shorter $f_i$, the lens focuses more strongly, so the phase shift changes more rapidly as a function of the radial coordinate. Note that the transmission function {eq}`eq:diff:lensTransform` has modulus 1 so that energy is conserved.

The field on the right-hand side of {eq}`eq:diff:lensFieldOutput` is used in diffraction optics as the field in the exit pupil. But instead of using ray tracing, the field in the focal region is computed using diffraction integrals.
We substitute the field in the exit pupil in the Fresnel diffraction integral {eq}`eq:diff:fresnelIntegral` and obtain:

```{math}
\begin{align*}
U(x,y,z)=\frac{e^{ikz}e^{\frac{ik(x^2+y^2)}{2z}}}{i\lambda z} \mathcal{F}\left\{U_0(x',y') 1_{⊙_a}(x',y') e^{ik\frac{x'^2+y'^2}{2}\left(\frac{1}{z}-\frac{1}{f_i}\right)}\right\}\left(\frac{x}{\lambda z },\frac{y}{ \lambda z }\right).
\end{align*}
```
The intensity $I=|U|^2$ is shown at the bottom left of {numref}`fig:diff:focusingLens`. It is seen that the intensity does not monotonically increase for decreasing distance to the focal point. Instead, secondary maxima occur along the optical axis. Also the boundary of the light cone is not sharp, as predicted by geometrical optics, but diffuse. The bottom right of {numref}`fig:diff:focusingLens` shows the phase in the focal region. The wave fronts are close to but not exactly spherical inside the cones.
```{figure} Images/07_18_focusing_lens_sketch_bw.png
:name: fig:diff:focusingLens
Top: wavefronts of the incident plane wave and the focused field according to Gaussian geometrical optics. There is no light outside of the two cones. Bottom left: amplitude as predicted by diffraction optics. The boundary of the cones is diffuse and it is not absolutely dark outside of the cones. Furthermore, the intensity does not increase monotonically with decreasing distance to the focal point, as predicted by geometrical optics. Bottom right: phase of the focused field as predicted by diffraction optics.
```


For points in the image focal plane of the lens, i.e. $z=f_i$, we have

```{math}
:label: eq:diff:fourierLens
\begin{align*}
U(x,y,f_i)= \frac{e^{ikf_i}e^{\frac{ik(x^2+y^2)}{2f_i}}}{i\lambda f_i} \mathcal{F}\left\{U_0(x',y')1_{⊙_a}(x',y') \right\}\left(\frac{ x}{ \lambda f_i},\frac{ y}{ \lambda f_i }\right),
\end{align*}
```
which is the same as the Fraunhofer integral for propagation over the distance $f_i$!

```{note}
The field in the entrance pupil of the lens and the field in the focal plane are related by a Fourier transform (apart from a quadratic phase factor in front of the integral).
```

It can be shown that the fields in the front focal plane $U(x,y,-f_i)$ and the back focal plane $U(x,y,f_i)$ are related **exactly** by a Fourier transform, i.e. without the quadratic phase factor[^6].
So a lens performs a Fourier transform. Let us see if that agrees with some of the facts we know from geometrical optics.

1. We know from Gaussian geometrical optics that if we illuminate a positive lens with rays parallel to the optical axis, these rays all intersect in the image focal point. This corresponds with the fact that for $U_0(x,y)=1$ (i.e. plane wave illumination, neglecting the finite aperture of the lens, i.e. neglecting diffraction due to the finite size of the pupil), the Fourier transform of the pupil field is a delta peak:

```{math}
:label: eq:diff:focalPlaneField
\begin{align*}
\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)=\delta\left(\frac{k_x}{2\pi}\right)\delta\left(\frac{k_y}{2\pi}\right),
\end{align*}
```
which represents the perfect focused spot (without diffraction).

2. If in Gaussian geometrical optics we illuminate a lens with tilted parallel rays of light (a plane wave propagating in an oblique direction), then the point in the back focal plane where the rays intersect is laterally displaced. A tilted plane wave is described by $U_0(\mathbf{r})=\exp(i\mathbf{k}_0\cdot\mathbf{r})$, and its Fourier transform with respect to $(x,y)$
is given by

$$
\mathcal{F}\{U_0\}\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi},z\right)=\delta\left(\frac{k_x-k_{0,x}}{2\pi}\right)\delta\left(\frac{k_y-k_{0,y}}{2\pi}\right),
$$
which is indeed a shifted delta peak (i.e. a shifted focal spot).

It seems that the diffraction model of light confirms what we know from geometrical optics. But in the previous two examples we discarded the influence of the finite size of the pupil, i.e. we have left out of consideration the function $1_{⊙_a}$ in calculating the Fourier transform. If $U_0(x,y)=1$ in the entrance pupil and we take the finite size of the pupil properly into account, the $\delta$-peaks become blurred: the focused field is then given by the Fourier transform of the circular disc with radius $a$, evaluated at spatial frequencies
$\xi = \frac{x}{\lambda f_i}$, $\eta =\frac{ y}{\lambda f_i}$. This field is called the **Airy spot** and is given by (See {eq}`eq:diff:airyPattern`):


```{math}
:label: eq:diff:airyPattern
\begin{align*}
U(x,y,z)=\frac{ \pi a^2}{\lambda f_i} \, \frac{ 2 J_1\left(2\pi \frac{ a }{\lambda f_i } \sqrt{x^2 + y^2} \right) }
{ \frac{2\pi a }{\lambda f_i } \sqrt{x^2 + y^2} }, \hspace{1cm} \mathbf{Airy pattern for focusing},
\end{align*}
```

where $J_1$ is the Bessel function of the first kind and where the phase factors in front of the Fourier transform have been omitted. The pattern is shown in {numref}`fig:diff:airySpot`. It is circularly symmetric and consists of a central maximum surrounded by concentric rings of alternating zeros and secondary maxima with decreasing amplitudes. In cross-section, as a function of $r=\sqrt{x^2+y^2}$, the Airy pattern is similar (but not identical) to the $\text{ sinc}$-function. From the uncertainty principle illustrated in {numref}`fig:diff:uncertainty` it follows that the size of the focal spot decreases as $a$ increases, and from {eq}`eq:diff:airyPattern` we see that the Airy function is a function of the dimensionless variable $a r/(\lambda f_i)$. Hence the focal spot becomes narrower as $a/(\lambda f_i)$ increases. The Numerical Aperture ($\text{NA}$) is defined by

```{math}
\begin{align*}
\text{NA}=\frac{a}{f_i}, \hspace{1cm} \mathbf{numerical aperture}.
\end{align*}
```

Since the first zero of the Airy pattern occurs for $a r/(\lambda f_i)= 0.61$, the width of the focal spot can be estimated by


```{math}
:label: eq:diff:resolutionLimitution
\begin{align*}
\mathbf{Size of focal spot} \approx 0.61 \frac{\lambda}{\text{NA}}
\end{align*}
```

```{figure} Images/07_19_airy_disk_color.png
:name: fig:diff:airySpot
Left: cross section of the field of the Airy pattern. Right: intensity of the Airy pattern.
```

**Remark**.
In the simple case of a single thin lens, the entrance and exit pupils coincide with the lens itself. As has been explained in the {ref}`Stops section <sec:geo:stops>` of the {ref}`Geometrical Optics chapter <chapter:geo>`, the exit pupil in systems consisting of several lenses is the real or virtual image of the aperture stop under all optical lenses to the right of the stop. To model the effect of diffraction in such more complicated systems, diffraction is assumed to take place entirely in the exit pupil. The field in the exit pupil is first determined by non-paraxial ray tracing and is then integrated over the exit pupil using the Fresnel diffraction integral.

### Imaging by a lens
It follows from the derivations in the previous section that the Airy pattern is the image of a point source infinitely far in front of a lens. In this section we study the imaging of a general object at a finite distance from the lens.
Consider first a real point object on the optical axis with coordinate $z=s_o<f_o$ to the left of the object focal point of a positive lens with image focal coordinate $f_i>0$. This lens will form a real image with positive coordinate $s_i>0$.

The field in image space is derived using the Fresnel diffraction integral, similar to the focused field in the previous section. We postulate that the lens transforms the field radiated by the point object into a spherical wave in the exit pupil, which converges to the ideal image point of Gaussian geometrical optics. We substitute this spherical pupil field in the Fresnel diffraction integral to compute the field in image space. Then for an object point on the optical axis we find the same Airy pattern as in {numref}`fig:diff:airySpot`, except that the variable $a r/(\lambda f_i)$ is replaced by
$a r/(\lambda s_i)$,
where $s_i$ is the image coordinate as given by the Lensmaker's Formula. This field is called the Point Spread Function (PSF):


```{math}
:label: eq:diff:pointSpreadFunction
\begin{align*}
\text{PSF}(x,y) =\frac{ \pi a^2}{\lambda s_i} \frac{J_1\left(2\pi \frac{ a }{\lambda s_i } \sqrt{x^2 + y^2} \right) }{ \frac{2\pi a }{\lambda s_i } \sqrt{x^2 + y^2} }, \hspace{1cm} \mathbf{Airy pattern for imaging}.
\end{align*}
```

For object points that are not on the optical axis, the PSF is translated such that it remains centered on the ideal Gaussian image point.

A general object field $U_o(x,y) $ can be considered a superposition of point objects and the images of these points are given by translated PSFs:

$$
\text{PSF}(x-x_i, y-y_i),
$$
where $(x_i, y_i)$ are the transverse coordinates of the image point according to Gaussian geometrical optics.
The total image field is obtained by summing (integrating) over these PSFs, weighted by the field at the object points:

```{math}
:label: eq:diff:imagingEquation
\begin{align*}
U_{i}(x,y,s_i) =
\int\!\int \text{PSF}\left(x-Mx_o, x-My_o \right) U_o(x_o,y_o,s_o)\, \text{d}x_o \text{d}y_o.
\end{align*}
```
where $x_o=x_i/M$ and $y_o=y_i/M$ are the object-point coordinates and $M$ is the magnification.
The integral can be made into a convolution by using the coordinates $x_i, y_i$ as integration variables.

It is clear from {eq}`eq:diff:pointSpreadFunction` that a larger radius $a$ of the lens and a smaller wavelength $\lambda$ imply a narrower PSF.
This in turn implies that the kernel in the convolution is more sharply peaked and hence that the resolution of the image is higher
[^7].


**Remark.**

1. If laser light is used to illuminate the object, the object field may be considered perfectly coherent. This implies that a detector in the image plane would measure the squared modulus of the complex field {eq}`eq:diff:imagingEquation`:

```{math}
:label: eq:diff:coherentIntensity
\begin{align*}
I_i(x,y,s_i) = \left| \int\!\int \text{PSF}\left(x-M x_o, y- My_o \right) U_o(x_o,y_o,s_o)\, \text{d}x_o \text{d}y_o \right|^2.
\end{align*}
```
In this case the system is called a **coherent imaging system**.

2. If the object is a spatially incoherent extended source, the fields emitted by the point sources of which extended source consists cannot interfere in the image plane. Therefore, in this case the intensity in the image plane is given by the incoherent sum:

```{math}
:label: eq:diff:incoherentIntensity
\begin{align*}
I_i(x,y,s_i) = \ \int\!\int \left|\text{PSF}\left(x-M x_o, y- M x_o \right)\right|^2 \, I_o(x_o,y_o,s_o)\, \text{d}x_o \text{d}y_o,
\end{align*}
```
where $I_o=|U_o|^2$ is the intensity distribution of the extended source.
Hence the image intensity is expressed in the intensity of the source by a convolution with the intensity of the PSF. This system is called a **incoherent imaging system**.

3. An object is often illuminated by a spatially incoherent extended light source and then imaged. According to the discussion in the {ref}`Propagation of Mutual Coherence section <sec:coh:scprop>` of the {ref}`Interference chapter <chapter:coh>`, the field that illuminates the object is then partially coherent. It is more coherent when the angle that the source extends at the object is smaller. The intensity in the image plane can be computed by splitting the spatially incoherent source into sufficiently many mutually incoherent point sources and computing the intensities in the image plane due to the illumination of the object by each individual point source. The total intensity in the image plane is then the sum of these intensities.

4. We have considered only scalar diffraction theory. However, for a lens with numerical aperture larger than 0.6, the change of polarization can be important. Then a more general diffraction theory is needed [^8].

### Spatial Light Modulators and Optical Fourier Filtering

- **SLM.** The field in the entrance pupil of a lens, in particular its phase can be changed spatially by a so-called **spatial light modulator** (SLM). A SLM has thousands of pixels by which very general focused fields can be made.
An example is a focused fields with only a longitudinal component in the focal point (i.e. only the $E_z$-component is nonzero at the focal point) [^9].

- **Fourier filtering.** Suppose we have the setup as shown in {numref}`fig:diff:fourierFiltering`. With one lens we can create the Fourier transform of some field $U(x,y)$. Let a mask be put in the focal plane and a second lens be used to refocus the light.
This implies that the amplitude and/pf phase of the plane waves in the angular spectrum of the field are manipulated.
The procedure is called Fourier filtering using lenses. An application of this idea is the phase contrast microscope.


```{figure} Images/07_20_fourier_filtering.png
:name: fig:diff:fourierFiltering
Set-up for Fourier filtering. The first lens creates a Fourier transform of $U(x,y)$, to which we can apply some operation (e.g. applying different phase shifts to different parts of the field). The second lens then applies another Fourier transform (which is the same as the inverse Fourier transform and a mirror transformation).
```


## Super-resolution
We have emphasised that evanescent waves set the ultimate limit to resolution in optics. In {ref}`chapter:geo` it was explained that, although within geometrical optics one can image a single point perfectly using conical surfaces, several points, let alone an extended object, cannot be imaged perfectly.
It was furthermore explained that when only paraxial rays are considered, i.e. within Gaussian geometrical optics, perfect imaging of extended objects *is* possible. However, rays of which the angle with the optical axis is large cause aberrations. But even when perfect imaging would be possible in geometrical optics, a real image can never be perfect due to the fact that information contained in the amplitudes and phase of the evanescent waves cannot propagate.
The resolution that can be obtained with an optical system consisting of lenses is less than follows from considering the loss of information due to evanescent waves, because propagating waves with spatial frequencies that are too large to be captured by the optical system (i.e. waves of which the angles with the optical axis are larger than the numerical aperture) cannot contribute to the image. Therefore the image of a point object has the size

```{math}
:label: eq:diff:resolutionLimit
\begin{align*}
\lambda/\text{NA}_i,
\end{align*}
```
where $\text{NA}_i=a/s_i$ is the numerical aperture in image space, i.e. it is the sinus of half the opening angle of the cone extended by the exit pupil at the Gaussian image point on the optical axis. This resolution limit is called the diffraction limit.

The size of the image of a point as given by the PSF in {eq}`eq:diff:pointSpreadFunction` is influenced by the magnification of the system. To characterize the resolution of a diffraction-limited system, it is therefore better to consider the numerical aperture on the object side: $\text{NA}_o = \text{NA}_i |M| = a/s_o$. The value of $\text{NA}_o$ is the sinus of the half angle of the cone subtended by the entrance pupil of the system on the object point on the optical axis. This is the cone of wave vectors emitted by this object point that can contribute to the image (they are "accepted" by the optical system). The larger the half angle of this cone, the more spatial frequencies can contribute to the image and hence the larger the information about finer details of the object that can reach the image plane.

It should be clear by now that beating the diffraction limit is extremely difficult. Nevertheless, a lot of research in optics is directed towards realizing this goal. Many attempts have been made, some successful, others not so, but, whether successful or not, most were based on very ingenious ideas. To close this chapter on diffraction theory, we will give examples of attempts to achieve what is called super-resolution.

- **Confocal microscopy.** A focused spot is used to scan the object and the reflected field is imaged onto a small detector (''point detector'').
The resolution is roughly a factor 1.5 better than for normal imaging with full field of view using the same objective. The higher resolution is achieved thanks to the illumination by oblique plane waves that are present in the spatial Fourier transform of the illuminating spot. By illumination with plane waves with large angles of incidence, higher spatial frequencies of the object which under normal incidence are not accepted by the objective, are now ''folded back'' into the cone of plane waves accepted by the objective. The higher resolution comes at the prize of longer imaging time because of scanning. The confocal microscope was invented by Marvin Minsky in 1957.

- **The Perfect Lens based on negative refraction.** It can be shown that a slab of a material with **negative permittivity** and **negative permeability**, which are opposite to the permittivity and permeability of the surrounding medium, there is no reflection at the interfaces. Furthermore, the phase velocity in a material with negative permittivity and negative permeability is opposite to the direction of the flow of energy and plane waves are refracted at the interface as if the refractive index in Snell's Law is negative. Therefore these media are called negative index media. Because the phase velocity is opposite to the energy velocity, it is as if time is reversed inside the slab. The change of phase of propagating waves of the field of point source due to propagating in the surrounding medium is reversed inside the slab and at some distance on the other side of the slab there is an image point where all propagating waves are in phase, as illustrated in
{numref}`fig:diff:pendryLens`. Furthermore, evanescent waves **gain** amplitude inside the slab and it turns out they have the same amplitude in the image point as in the source, hence the image point is perfect. Note that the increase of amplitude of an evanescent wave does not violate the conservation of energy, because an evanescent wave does not propagate energy in the direction in which it is evanescent.
```{figure} Images/07_21_pendry_lens.png
:name: fig:diff:pendryLens
Pendry's perfect lens consists of a slab of a material with negative permittivity and negative permeability such that its absolute values are equal to the positive permittivity and positive permeability of the surrounding medium. Points outside the slab are imaged perfectly in two planes: one inside the slab and the other on the opposite side of the slab.
```

The simple slab geometry seen in {numref}`fig:diff:pendryLens` which acts as a perfect lens was proposed by John Pendry in 2000 [^10]. Unfortunately, a material with negative permittivity and negative permeability has not been found in nature. Therefore, many researchers have attempted to mimic such a material by mixing metals and dielectrics on a sub-wavelength scale. It seems that a negative index without absorption violates causality. But when there is absorption, the image is not anymore perfect.

- **Hyperbolic materials.** Hyperbolic materials are anisotropic, i.e. the phase velocity of a plane wave depends on the polarization and on the direction of the wave vector. The permittivity of an anisotropic material is a tensor (loosely speaking a (3,3)-matrix). Normally the eigenvalues of the permittivity matrix are positive; however, in a hyperbolic material two eigenvalues are of equal sign and the third has opposite sign. In such a medium all waves with the so-called extraordinary state of polarization propagate, no matter how high the spatial frequencies are. Hence, for the extraordinary state of polarization evanescent waves do not exist and therefore super-resolution and perfect imaging should be possible in such a medium.
```{figure} Images/07_22_metamaterials.jpg
:name: fig:diff:multilayers
Examples of composite materials consisting of thin (sub-wavelength) layers of metals and dielectrics. These artificial materials are called metamaterials. (A. Poddubny, I. Iorsh, P. Belov, \& Y. Kivshar, *Hyperbolic Metamaterials*, {N}at. {P}hoton., 7(12), 948-957 [(2013)](https://doi.org/10.1038/nphoton.2013.243)).
```

A few natural hyperbolic media exist for visible frequencies, but there are more in the mid-infrared. Researchers try to approximate hyperbolic media by metamaterials, made e.g. multilayers consisting of alternating thin metallic and dielectric layers, so that the effective permittivity has the desired hyperbolic property. Also metallic nanopilars embedded in a dielectric are used.

- **Nonlinear effects.** When the refractive index of a material depends on the local electric field, the material is nonlinear. At optical frequencies nonlinear effects are in general very small, but with a strong laser they can become significant. One effect is self-focusing, where the refractive index is proportional to the local light intensity. The locally higher intensity causes an increase of the refractive index, leading to a waveguiding effect due to which the beam focuses even more strongly. Hence the focused beam becomes more and more narrow while propagating, until finally the material breaks down.

- **Stimulated Emission Depletion Microscopy (STED).** This technique was invented by V. A. Okhonin in 1986 in the USSR and was further developed by Stefan Hell and his co-workers in the nineties. Hell received the Nobel Prize in chemistry for his work in 2014. STED is a non-linear technique with which super-resolution in fluorescence microscopy can be achieved. Images made with a fluorescence microscope are blurred when the fluorescent molecules are very close together. In the STED microscope a special trick is used to ensure that molecules which fluoresce at the same time are sufficiently distant from each other so that they can be imaged individually. To achieve this two focused spots are used: the first spot excites the molecules to a higher level. The second spot is slightly red-shifted and has a doughnut shape (see {numref}`fig:diff:stedSmall`). It causes decay of the excited molecules to the lower level by stimulated emission (the excited state is depleted). Because of the doughnut shape of the second spot, the molecule in the center of the spot is not affected and will still fluoresce. Crucial is that a doughnut spot has a central dark region which is very narrow, i.e. it can be much smaller than the Airy spot and this is the reason for the super-resolution.
```{figure} Images/07_23_sted_large.png
:name: fig:diff:stedSmall
Spot used for excitation (top left) and for depletion (top middle). Fluorescence signal top right.	In the lower figure the confocal image is compared to the STED image. (P.F. Rodriguez and al., *Building a fast scanning stimulated emission depletion microscope*, Materials Science [(2012)](https://www.semanticscholar.org/paper/Building-a-fast-scanning-stimulated-emission-a-step-Rodriguez-Wu/46d8c4148e93f30cf11e1ae4356620bd5fcd0475))
```

## Chapter Summary

- **Angular spectrum method** decomposes fields into plane waves; propagation multiplies each by $e^{ik_z z}$.
- **Rayleigh-Sommerfeld integral** propagates fields by summing spherical wave contributions from each source point.
- **Fresnel approximation** applies when the observation distance is much larger than the aperture size; quadratic phase approximation.
- **Fraunhofer approximation** (far-field): The diffracted field is the Fourier transform of the aperture field.
- **Single slit**: Intensity pattern $I \propto \text{sinc}^2(\pi a \sin\theta/\lambda)$; first minimum at $\sin\theta = \lambda/a$.
- **Circular aperture**: Produces the Airy pattern; central disk radius $\approx 1.22\lambda/D$.
- **Rayleigh criterion**: Two point sources are resolved when the maximum of one coincides with the first minimum of the other.
- **Diffraction limit**: Resolution is fundamentally limited by $\Delta x \approx 0.61\lambda/\text{NA}$ due to loss of evanescent waves.
- **Lenses perform Fourier transforms**: A lens in 2f-2f configuration gives the Fourier transform in its back focal plane.
- **Point Spread Function (PSF)**: The image of a point source; the image of any object is a convolution with the PSF.
- **Super-resolution techniques** (STED, near-field microscopy) can overcome the diffraction limit using special methods.

```{note} External sources in recommended order
1. {cite}`SixtySymbols_Fourier` Basic explanation of Fourier transforms. Also see {ref}`sec:diff:fourierintuition`.
1. {cite}`SixtySymbols_Heisenberg` Basic explanation of the uncertainty principle (though in the context of quantum physics).
1. E. Hecht, *Optics*, &sect; 7.4.4, subsection '*Fourier Analysis and Diffraction*'.
1. J. Goodman, *Introduction to Fourier Optics*, &sect;5.2.2: Several calculations on the Fourier transforming properties of lenses.
1. E. Hecht, *Optics*, &sect; 10.2.6, subsection '*Resolution of imaging systems*'.
```


[^1]: {cite}`SixtySymbols_Fourier` Basic explanation of Fourier transforms. Also see {ref}`sec:diff:fourierintuition`.

[^2]: For a rigorous derivation see e.g. {cite}`Goodman_FourierOptics`, §3.3, §3.4, §3.5 - and *Lecture Notes of Advanced Photonics*, Delft University of Technology.

[^3]: See the course Advanced Photonics given at TUDelft.

[^4]: {cite}`SixtySymbols_Heisenberg` Basic explanation of the uncertainty principle (though in the context of quantum physics)

[^5]: For a proof see {cite}`Siegman_Lasers`

[^6]: {cite}`Goodman_FourierOptics`, §5.2.2 - Several calculations on the Fourier transforming properties of lenses.

[^7]: {cite}`Hecht_Optics` §10.2.6 'Resolution of imaging systems'.

[^8]: {cite}`Braat_ImagingOptics`

[^9]: See {cite}`PRL_2008`

[^10]: {cite}`Pendry_PRL_2000`
