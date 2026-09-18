---
tags:
  - polarization
  - intermediate
  - theory
downloads:
  - id: chapter-04-pdf
    title: Download Chapter PDF
  - id: chapter-04-docx
    title: Download Chapter DOCX
---

(chapter:pol)=
# Polarization

```{note} What you should know and be able to do after studying this chapter
- Understand how different states of polarization are related to the ratio of the amplitudes and the difference in phase between two orthogonal components of the electric field.
- Know that elliptical polarization is the most general state of polarization.
- Know that linear polarization and circular polarization are special cases.
- Know how to compute the degree of polarization.
- Be able to work with Jones vectors and Jones matrices.
- Know how birefringence is exploited to create wave plates and know the types of wave plates.
- Know how to rotate a state of linear polarization over a given angle.
- Know how to change linear polarization into circular polarization and conversely.
- Be able to show that elliptical polarization can be written as the sum of two orthogonal linear polarizations and as the sum of two circular polarizations.
```


## Polarization States and Jones Vectors
We have seen in {ref}`chapter:basics` that light is an electromagnetic wave which satisfies Maxwell's equations and the wave equation derived therefrom. Since the electric field is a vector which oscillates as function of time in a certain direction, we say that the wave has a certain polarization. In this chapter we look at the different types of polarization and how the polarization of a light beam can be manipulated.

From Maxwell's equations and the wave equation, we know that the (real) electric field $\mathbf{\mathcal{E}}(\mathbf{r},t)$ of a time-harmonic plane wave is always perpendicular to the direction of propagation, which is the direction of the wave vector $\mathbf{k}$ as well as the direction of the Poynting vector (the direction of the power flow). Let the wave propagate in the $z$-direction:

```{math}
:label: eq:pol:waveVector
\begin{align*}
\mathbf{k}=
\left( \begin{array}{c}0\\0\\ k
\end{array}\right).
\end{align*}
```
Then the electric field vector does not have a $z$-component and hence the real electric field at $z$ and at time $t$ can be written as

```{math}
:label: eq:pol:electricFieldVector
\begin{align*}
\mathbf{\mathcal{E}}(z,t) = \left(\begin{array}{c}{\cal A}_x \cos(kz-\omega t + \varphi_x) \\{\cal A}_y \cos(kz-\omega t + \varphi_y) \\0
\end{array}\right).
\end{align*}
```
where ${\cal A}_x$ and ${\cal A}_y$ are positive amplitudes and $\varphi_x$, $\varphi_y$ are the phases of the electric field components. While $k$ and $\omega$ are fixed, we can vary ${\cal A}_x$, ${\cal A}_y$, $\varphi_x$ and $\varphi_y$. This degree of freedom is why different states of polarization exist: **the state of polarization is determined by the ratio of the amplitudes and by the phase difference $\varphi_y-\varphi_x$ between the two orthogonal components of the light wave** {cite:p}`retardation`. Consider the electric field in a fixed plane $z=0$:

```{math}
\begin{align*}
\left(\begin{array}{c}{\cal E}_x(0,t) \\{\cal E}_y(0,t)
\end{array} \right)
= \left( \begin{array}{c}{\cal A}_x \cos(-\omega t + \varphi_x) \\{\cal A}_y \cos(-\omega t + \varphi_y)
\end{array}\right)
=\text{Re}\left\{
\left( \begin{array}{c}{\cal A}_x e^{i\varphi_x} \\{\cal A}_y e^{i\varphi_y}
\end{array}\right)
e^{-i\omega t}
\right\}
= \text{Re}\left\{ \left(\begin{array}{c}E_x(0) \\E_y(0)
\end{array}\right) e^{-i \omega t} \right\}
\end{align*}
```
The complex vector

```{math}
:label: eq:pol:jonesVectorDefinition
\begin{align*}
{\mathbf J}=
\left(\begin{array}{c}E_x(0) \\E_y(0)
\end{array}\right) =
\left(\begin{array}{c}{\cal A}_x e^{i\varphi_x} \\{\cal A}_y e^{i\varphi_y}
\end{array}\right),
\end{align*}
```
is called the **Jones vector**. It is used to characterize the polarization state.
Let us see how, at a fixed position in space, the electric field vector behaves as a function of time for different choices of ${\cal A}_x$, ${\cal A}_y$ and $\varphi_y-\varphi_x$.

**a) Linear polarization:** $\varphi_y-\varphi_x=0$ or $\varphi_y-\varphi_x=\pi$.]
When $\varphi_y-\varphi_x=0$ we have

```{math}
:label: eq:pol:jonesLinearPolarization
\begin{align*}
{\mathbf J}=
\left(\begin{array}{c}{\cal A}_x \\{\cal A}_y
\end{array}\right) e^{i \varphi_x}.
\end{align*}
```
Equality of the phases: $\varphi_y=\varphi_x$, means that the field components ${\cal E}_x(z,t)$ and ${\cal E}_y(z,t)$ are in phase: when ${\cal E}_x(z,t)$ is large, ${\cal E}_y(z,t)$ is large, and when ${\cal E}_x(z,t)$ is small, ${\cal E}_y(z,t)$ is small. We can write

```{math}
\begin{align*}
\left(\begin{array}{c}{\cal E}_x(0,t) \\{\cal E}_y(0,t)
\end{array}\right)
= \left(\begin{array}{c}{\cal A}_x \\{\cal A}_y
\end{array}\right)
\cos(\omega t-\varphi_x),
\end{align*}
```
which shows that for $\varphi_y-\varphi_x=0$ the electric field simply oscillates in one direction given by real the vector ${\cal A}_x \hat{\mathbf{x}} + {\cal A}_y \hat{\mathbf{y}}$.
See {numref}`fig:pol:dphi000piF1Bw`.

If $\varphi_y-\varphi_x=\pi$ we have

```{math}
:label: eq:pol:jonesLinearPolarizationPhase
\begin{align*}
{\mathbf J}=
\left( \begin{array}{c}{\cal A}_x \\-{\cal A}_y
\end{array}\right) e^{i \varphi_x}.
\end{align*}
```
In this case ${\cal E}_x(z,t)$ and ${\cal E}_y(z,t)$ are out of phase and the electric field oscillates in the direction given by the real vector ${\cal A}_x \hat{\mathbf{x}} - {\cal A}_y \hat{\mathbf{y}}$.

**b) Circular polarization:
** $\varphi_y-\varphi_x=\pm \pi/2$, ${\cal A}_x={\cal A}_y$.
In this case the Jones vector is:

```{math}
:label: eq:pol:jonesCircularPolarization
\begin{align*}
{\mathbf J}=
\left(\begin{array}{c}1 \\\pm i
\end{array}\right) {\cal A}_x e^{i \varphi_x}.
\end{align*}
```
The field components ${\cal E}_x(z,t)$ and ${\cal E}_y(z,t)$ are $\pi/2$ radian (90 degrees) out of phase: when ${\cal E}_x(z,t)$ is large, ${\cal E}_y(z,t)$ is small, and when ${\cal E}_x(z,t)$ is small, ${\cal E}_y(z,t)$ is large. We can write for $z=0$ and with $\varphi_x=0$:

```{math}
:label: eq:pol:circularPolarizationTime
\begin{align*}
\left(
\begin{array}{c}{\cal E}_x(0,t) \\{\cal E}_y(0,t)
\end{array}\right)
=
\left(\begin{array}{c}{\cal A}_x \cos(-\omega t)\\{\cal A}_x \cos(-\omega t \pm \pi/2)
\end{array}\right)
=
{\cal A}_x
\left(\begin{array}{c}\cos(\omega t)\\\pm \sin(\omega t)
\end{array}\right)
\end{align*}
```

At a given position, the electric field vector moves along a circle as time
proceeds. When for an observer looking towards the source, the electric field is
rotating anti-clockwise, the polarization is called **left-circularly polarized
** (+ sign in {eq}`eq:pol:circularPolarizationTime`), while if the electric
vector moves clockwise, the polarization is called **right-circularly polarized
** (- sign in {eq}`eq:pol:circularPolarizationTime`).

**c) Elliptical polarization:** $\varphi_y-\varphi_x=\pm \pi/2$, ${\cal A}_x$ and ${\cal A}_y$ arbitrary.
The Jones vector is:

```{math}
:label: eq:pol:jonesEllipticalPolarization
\begin{align*}
{\mathbf J}=
\left(\begin{array}{c}{\cal A}_x \\\pm i {\cal A}_y
\end{array} \right) e^{i \varphi_x}.
\end{align*}
```

In this case we get instead of {eq}`eq:pol:circularPolarizationTime` (again
taking $\varphi_x=0$):

```{math}
\begin{align*}
\left(\begin{array}{c}{\cal E}_x(0,t) \\{\cal E}_y(0,t)
\end{array}\right)
=
\left( \begin{array}{c}{\cal A}_x \cos(\omega t)\\\pm {\cal A}_y\sin(\omega t)
\end{array}\right).
\end{align*}
```
which shows that the electric vector moves along an ellipse with major and minor axes parallel to the $x$- and $y$-axis. When the + sign applies, the field is called left-elliptically polarized, otherwise it is called right-elliptically polarized.

**d) Elliptical polarization:** $\varphi_y-\varphi_x=$ anything else, ${\cal A}_x$ and ${\cal A}_y$ arbitrary.
The Jones vector is now the most general one:

```{math}
:label: eq:pol:jonesGeneralElliptical
\begin{align*}
{\mathbf J}=
\left(\begin{array}{c}{\cal A}_x e^{i \varphi_x} \\{\cal A}_y e^{i \varphi_y}
\end{array}\right).
\end{align*}
```
It can be shown that the electric field vector moves always along an ellipse.
The exact shape and orientation of this ellipse varies with the difference in phase $\varphi_y-\varphi_x$ and the ratio of the amplitude ${\cal A}_x,{\cal A}_y$ and, except when $\varphi_y-\varphi_x = \pm \pi/2$, the major and minor axis of the ellipse are not parallel to the $x$- and $y$-axis. See {numref}`fig:pol:dphi025piF1Bw`.

**Remarks**.
- Frequently the Jones vector is normalized such that

```{math}
:label: eq:pol:jonesNormalization
\begin{align*}
|J_x|^2 + |J_y|^2 =1.
\end{align*}
```
The normalized vector represents of course the same polarization state as the unnormalized one. In general, multiplying the Jones vector by a complex number does not change the polarization state. If we multiply for example by $e^{i\theta}$, this has the same result as changing the instant that $t=0$, hence it does not change the polarization state. In fact:

```{math}
:label: eq:pol:timeShiftEquivalence
\begin{align*}
\mathbf{\mathcal{E}}(0,t) = \text{Re} \left[ e^{i \theta} \mathbf{J} e^{-i\omega t} \right] = \text{Re} \left[ \mathbf{J} e^{-i\omega( t- \theta/\omega)}\right]
\end{align*}
```

- We will show in the Angular Spectrum Method section of the Diffraction chapter that a general time-harmonic electromagnetic field, is a superposition of plane waves with wave vectors of the same length determined by the frequency of the wave but with different directions. An example is the electromagnetic field near the focal plane of a strongly converging lens. There is then no particular direction of propagation to which the electric field should be perpendicular. In other words, there is no obvious choice for a plane in which the electric field oscillates as function of time. It can nevertheless be shown that for every point in space such a plane exists, but the orientation of the plane varies in general with position{cite:p}`born_wolf`. In this chapter we only consider the field and polarization state of a single plane wave.
Furthermore, the electric field in a certain point moves along an ellipse in the corresponding plane, but the shape of the ellipse and the orientation of its major axis can be arbitrary.
We can conclude that in any point of an arbitrary time-harmonic electromagnetic field, the electric (and in fact also the magnetic) field vector prescribes as function of time an ellipse in some plane which depends on position{cite:p}`born_wolf`. In this chapter we only consider the field and polarization state of a single plane wave.


```{figure} Images/04_01_dphi_000pi_f1_bw.png
:name: fig:pol:dphi000piF1Bw
Linear polarization state of electromagnetic waves. The electric field vector oscillates along a single fixed direction perpendicular to the direction of propagation, tracing out a straight line in the plane perpendicular to the wave vector.
```

```{figure} Images/04_02_dphi_05pi_f1_bw.png
:name: fig:pol:dphi05piF1Bw
Circular polarization
```

```{figure} Images/04_03_dphi_025pi_f1_bw.png
:name: fig:pol:dphi025piF1Bw
Elliptical polarization

Illustration of different types of polarization. The horizontal and vertical arrows indicate the momentary field components ${\cal E}_x, {\cal E}_y$. The thick arrow indicates the vector $\mathbf{\mathcal{E}}$. The black curve indicates the trajectory of $\mathbf{\mathcal{E}}(t)$.
```


```{note} External source
- [KhanAcademy - Polarization of light, linear and circular](https://www.khanacademy.org/science/ap-physics-2/ap-light-waves/ap-introduction-to-light-waves/v/polarization-of-light-linear-and-circular): Explanation of different polarization states and their applications.
```

```{openlyceum} LightPropagation
:screen: 1
:label: fig:pol-em-wave-sim

A monochromatic electromagnetic wave with its electric field drawn perpendicular to the propagation direction. Later screens of this simulation send the same wave through polarizers and birefringent plates — the interactive counterpart of the Jones-matrix section that follows.
```

## Creating and Manipulating Polarization States
We have seen how Maxwell's equations allow the existence of plane waves with many different states of polarization. But how can we create these states, and how do these states manifest themselves?

Natural light often does not have a definite polarization. Instead, the polarization fluctuates rapidly with time.
To turn such randomly polarized light into linearly polarized light in a certain direction, we must extinguish the light polarized in the perpendicular direction.The remaining light is then linearly polarized along the desired direction. One could do this by using light reflected under the Brewster angle (which extinguishes p-polarized light), or one could let light pass through a dichroic crystal, which is a material which absorbs light polarized perpendicular to its so-called optic axis.
A third method is sending the light through a wire grid polarizer, which consists of a metallic grating with sub-wavelength slits. Such a grating only transmits the electric field component that is perpendicular to the slits.

So suppose that with one of these methods we have obtained linearly polarized light. Then the question rises how the state of linear polarization can be changed into circularly or elliptically polarized light? Or how the state of linear polarization can be rotated over a certain angle? We have seen that the polarization state depends on the ratio of the amplitudes and on the phase difference $\varphi_y-\varphi_x$ of the orthogonal components ${\cal E}_y$ and ${\cal E}_x$ of the electric field. Thus, to change linearly polarized light to some other state of polarization, a certain phase shift (say $\Delta \varphi_x$) must be introduced to one component (say ${\cal E}_x$), and another phase shift $\Delta \varphi_y$ to the orthogonal component ${\cal E}_y$. We can achieve this with a **birefringent crystal**, such as calcite.
What is special about such a crystal is that it has two refractive indices: light polarized in a certain direction experiences a refractive index $n_o$, while light polarized perpendicular to it feels another refractive index $n_e$ (the subscripts $o$ and $e$ stand for "ordinary" and "extraordinary", but for our purpose we do not need to understand this terminology). The direction for which the refractive index is *smallest* (which can be either $n_o$ or $n_e$) is called the **fast axis** because its phase velocity is largest, and the other direction is the **slow axis**. Because there are two different refractive indices, one can see double images through a birefringent crystal{cite:p}`viking_calcite`. The difference between the two refractive indices $\Delta n=n_e-n_o$ is called the **birefringence**.

Suppose $n_e>n_o$ and that the fast axis, which corresponds to $n_o$ is aligned with ${\cal E}_x$, while the slow axis (which then has refractive index $n_e$) is aligned with ${\cal E}_y$. If the wave travels a distance $d$ through the crystal, ${\cal E}_y$ will accumulate a phase $\Delta \varphi_y=\frac{2\pi n_e}{\lambda}d$, and ${\cal E}_x$ will accumulate a phase $\Delta \varphi_x=\frac{2\pi n_o}{\lambda}d$. Thus, after propagation through the crystal the phase difference $\varphi_y-\varphi_x$ has increased by

```{math}
:label: eq:pol:waveplatePhaseShift
\begin{align*}
\Delta\varphi_y-\Delta\varphi_x = \frac{2\pi}{\lambda}d(n_e-n_o).
\end{align*}
```

### Jones Matrices

By letting light pass through crystals of different thicknesses $d$ we can create different phase differences between the orthogonal field components and in this way we can create different states of polarization.
To be specific, let $\mathbf{J}$, as given by {eq}`eq:pol:jonesVectorDefinition`, be the Jones vector of the plane wave before
the crystal. Then we have, for the Jones vector after the passage through the
crystal:

```{math}
:label: eq:pol:jonesMatrixTransformation
\begin{align*}
\mathbf{\tilde{J}}={\cal M}\mathbf{J},
\end{align*}
```
where

```{math}
:label: eq:pol:jonesMatrixWaveplate
\begin{align*}
{\cal M}= \left( \begin{array}{cc}e^{\frac{2\pi i}{\lambda } d n_o} & 0 \\0 & e^{\frac{2\pi i}{\lambda } d n_e}
\end{array}\right) = e^{\frac{2\pi i}{\lambda } d n_o}
\left( \begin{array}{cc}1 & 0 \\0 & e^{\frac{2\pi i}{\lambda } d (n_e -n_o)}
\end{array}\right).
\end{align*}
```
A matrix such as ${\cal M}$, which transfers one state of polarization of a plane wave in another, is called a **Jones matrix**.
Depending on the phase difference which a wave accumulates by traveling through the crystal, these devices are called **quarter-wave plates** (phase difference $\pi/2$), **half-wave plates** (phase difference $\pi$), or **full-wave plates**  (phase difference $2\pi$). The applications of these wave plates will be discussed in later sections.

Consider as example the Jones matrix which described the change of linear polarized light into circular polarization.
Assume that we have diagonally (linearly) polarized light, so that

```{math}
\begin{align*}
J=
\frac{1}{\sqrt{2}}
\left(\begin{array}{c}1\\1
\end{array}\right).
\end{align*}
```
We want to change it to circularly polarized light, for which

```{math}
\begin{align*}
J=
\frac{1}{\sqrt{2}}
\left(\begin{array}{c}1\\ i
\end{array}\right),
\end{align*}
```
where one can check that indeed $\varphi_y-\varphi_x=\pi/2$.
This can be done by passing the light through a crystal such that ${\cal E}_y$ accumulates a phase difference of $\pi/2$ with respect to ${\cal E}_x$. The transformation by which this is accomplished can be written as

```{math}
\begin{align*}
\left( \begin{array}{cc}1&0\\0&i
\end{array}\right)
\frac{1}{\sqrt{2}}
\left(\begin{array}{c}1\\1
\end{array}\right)
=\frac{1}{\sqrt{2}}
\left(\begin{array}{c}1\\ i
\end{array}\right).
\end{align*}
```
The matrix on the left is the Jones matrix describing the operation of a quarter-wave plate.

Another important Jones matrix is the **rotation matrix**. In the preceding discussion it was assumed that the fast and slow axes were aligned with the $x$- and $y$-direction (i.e. they were parallel to ${\cal E}_x$ and ${\cal E}_y$). Suppose now that the slow and fast axes of the wave plate no longer coincide with $\widehat{\mathbf{x}}$ and
$\widehat{\mathbf{y}}$, but rather with some other $\widehat{\mathbf{x}}'$ and $\widehat{\mathbf{y}}'$ as in {numref}`fig:pol:rotationPolarization`. In that case we apply a basis transformation: the electric field vector which is expressed in the $\widehat{\mathbf{x}}$, $\widehat{\mathbf{y}}$ basis should first be expressed in the $\widehat{\mathbf{x}}'$, $\widehat{\mathbf{y}}'$ basis before applying the Jones matrix of the wave plate to it. After applying the Jones matrix, the electric field has to be transformed back from the $\widehat{\mathbf{x}}'$, $\widehat{\mathbf{y}}'$ basis to the $ \widehat{\mathbf{x}}$, $\widehat{\mathbf{y}}$ basis.

Let $\mathbf{E}$ be given in terms of its components on the $\hat{\mathbf{x}}$, $\hat{\mathbf{y}}$ basis:

```{math}
:label: eq:pol:fieldXyBasis
\begin{align*}
\mathbf{E}=E_x \widehat{\mathbf{x}} + E_y \widehat{\mathbf{y}}.
\end{align*}
```
To find the components $E_{x'}$, $E_{y'}$ on the $\widehat{\mathbf{x}}'$, $\widehat{\mathbf{y}}'$ basis:

```{math}
:label: eq:pol:fieldRotatedBasis
\begin{align*}
\mathbf{E}=E_{x'} \widehat{\mathbf{x}}' + E_{y'} \widehat{\mathbf{y}}'.
\end{align*}
```
we first write the unit vectors
$\widehat{\mathbf{x}}'$ and $\widehat{\mathbf{y}}'$ in terms of the basis
$\hat{\mathbf{x}}$, $\hat{\mathbf{y}}$
(see {numref}`fig:pol:rotationPolarization`)

```{math}
:label: eq:pol:xPrimeUnitVector
\begin{align*}
\widehat{\mathbf{x}}' &= \cos\theta \, \widehat{\mathbf{x}} + \sin \theta \, \widehat{\mathbf{y}}, \end{align*}
```
```{math}
:label: eq:pol:yPrimeUnitVector
\begin{align*}
\\
\widehat{\mathbf{y}}' &= -\sin\theta \, \widehat{\mathbf{x}} + \cos \theta \, \widehat{\mathbf{y}},\end{align*}
```

By substituting {eq}`eq:pol:xPrimeUnitVector` and {eq}`eq:pol:yPrimeUnitVector` into {eq}`eq:pol:fieldRotatedBasis` we find

```{math}
:label: eq:pol:fieldBasisTransformation
\begin{align*}
\mathbf{E} &= E_{x'} \widehat{\mathbf{x}}' + E_{y'} \widehat{\mathbf{y}}'  \\
&= E_{x'} ( \cos\theta \, \widehat{\mathbf{x}} + \sin \theta \, \widehat{\mathbf{y}} )+ E_{y'} (-\sin\theta \, \widehat{\mathbf{x}} + \cos \theta \, \widehat{\mathbf{y}}),
 \\
&= ( \cos \theta E_{x'} - \sin\theta E_{y'} )\widehat{\mathbf{x}}+ ( \sin\theta E_x + \cos \theta E_y)\widehat{\mathbf{y}}.
\end{align*}
```

Comparing with {eq}`eq:pol:fieldXyBasis` implies

```{math}
:label: eq:pol:rotationMatrix
\begin{align*}
\begin{pmatrix}
E_{x} \\
E_{y}
\end{pmatrix}=\begin{pmatrix}
E_{x'} \cos \theta - E_{y'} \sin \theta \\
E_{x'} \sin \theta + E_{y'} \cos \theta
\end{pmatrix} =
{\cal R}_{\theta}
\begin{pmatrix}
E_{x'} \\
E_{y'}
\end{pmatrix},
\end{align*}
```
where ${\cal R}_{\theta}$ is the rotation matrix over an angle $\theta$ in the anti-clockwise direction: {cite:p}`hecht`.

That ${\cal R}(\theta)$ indeed is a rotation over angle $\theta$ in the anti-clockwise direction is easy to see by considering what happens when ${\cal R}_\theta$ is applied to the vector $(1,0)^T$ {cite:p}`hecht`.

This relationship expresses the components $E_{x'}$, $E_{y'}$ of the Jones vector on the $\widehat{\mathbf{x}}'$, $\widehat{\mathbf{y}}'$ basis, which is aligned with the fast and slow axes of the crystal, in terms of the components $E_x$ and $E_y$ on the original basis $\widehat{\mathbf{x}}$, $\widehat{\mathbf{y}}$.
If the matrix ${\cal M}$ describes the Jones matrix as defined in {eq}`eq:pol:jonesMatrixWaveplate`, then the matrix $M_{\theta}$ for the same wave
plate but with $x'$ as slow and $y'$ as fast axis, is, with respect to
the $\widehat{\mathbf{x}}$, $\widehat{\mathbf{y}}$ basis, given by:


```{math}
:label: eq:pol:rotatedJonesMatrix
\begin{align*}
	{\cal M}_{\theta}={\cal R}_{\theta}{\cal M} {\cal R}_{-\theta}.
	\end{align*}
```

This is a standard result from linear algebra involving basis transformations.


```{figure} Images/04_04_rotation_polarization.png
:name: fig:pol:rotationPolarization
If the wave plate is rotated, the fast and slow axis no longer correspond to $x$ and $y$. Instead, we have to introduce a new coordinate system ($x',y'$).
```


### Linear polarizers

A polarizer that only transmits horizontally polarized light is described by the Jones matrix:

```{math}
:label: eq:pol:linearPolarizerMatrix
\begin{align*}
{\cal M}_{LP}=\left( \begin{array}{cc}1&0\\0&0
\end{array}\right).
\end{align*}
```
Clearly, horizontally polarized light is completely transmitted, while vertically polarized light is not transmitted at all. More generally, for light that is polarized at an angle $\alpha$, we get

```{math}
:label: eq:pol:malusLawDerivation
\begin{align*}
{\cal M}_\alpha={\cal M}_{LP}\left(\begin{array}{c}\cos\alpha\\\sin\alpha
\end{array}\right)=\left(\begin{array}{cc}1&0\\0&0
\end{array}\right)
\left(\begin{array}{c}\cos\alpha\\\sin\alpha
\end{array}\right)
=
\left( \begin{array}{c}\cos\alpha\\0
\end{array}\right).
\end{align*}
```
The amplitude of the transmitted field is reduced by the factor $\cos\alpha$, which implies that the intensity of the transmitted light is reduced by the factor $\cos^2 \alpha$. This relation is known as **Malus' law**.

### Degree of Polarization

Natural light such as sun light is unpolarized. The instantaneous polarization
of unpolarized light fluctuates rapidly in a random manner. A linear polarizer
produces linear polarized light from unpolarized light. It follows from {eq}`eq:pol:malusLawDerivation` that the intensity transmitted by a linear
polarizer when unpolarized light is incident, is the average value
of $\cos^2\alpha$ namely $\frac{1}{2}$, times the incident intensity.

Light that is a mixture of polarized and unpolarized light is called partially polarized. The **degree of polarization** is defined as the fraction of the total intensity that is polarized:

```{math}
:label: eq:pol:degreePolarization
\begin{align*}
\text{ degree of polarization} = \frac{I_{pol}}{I_{pol} + I_{unpol}}.
\end{align*}
```

### Quarter-Wave Plates

```{openlyceum} LightPropagation
:screen: 3
:label: fig:pol-waveplates-sim

A birefringent slab with adjustable retardation. Set a quarter-wave or half-wave plate, rotate the fast axis relative to a linear input, and watch linear light become circular (or rotate) — the same phase shift treated by the Jones matrix below.
```

A quarter-wave plate has already been introduced above. It introduces a phase shift of $\pi/2$, so its Jones matrix is

```{math}
:label: eq:pol:quarterWavePlateMatrix
\begin{align*}
{\cal M}_{QWP}=
\left(\begin{array}{cc}1&0\\0& i
\end{array}\right),
\end{align*}
```
because $\exp(i\pi/2)=i$. To describe the actual transmission through the quarter-wave plate, the matrix should be multiplied by some global phase factor, but because we only care about the **phase difference** between the field components, this global phase factor can be omitted without problem. The quarter-wave plate is typically used to **convert linearly polarized light to elliptically polarized light and vice-versa**{cite:p}`saleh_teich`. If the incident light is linearly polarized at angle $\alpha$, the state of polarization after the quarter-wave plate is

```{math}
:label: eq:pol:quarterWaveTransformation
\begin{align*}
\left(\begin{array}{c}\cos\alpha\\ i\sin\alpha
\end{array}\right)
=
\left( \begin{array}{cc}1&0\\0& i
\end{array}\right)
\left(\begin{array}{c}\cos\alpha\\\sin\alpha
\end{array}\right).
\end{align*}
```
In particular, if incident light is linear polarized under $45^o$, or equivalently, if the quarter wave plate is rotated over this angle, it will transform linearly polarized light into circularly polarized light (and vice versa).

```{math}
\begin{align*}
\frac{1}{\sqrt{2}}
\left(\begin{array}{c}1\\ i
\end{array}\right)
=
\left(\begin{array}{cc}1&0\\0& i
\end{array}\right)
\frac{1}{\sqrt{2}}
\left(\begin{array}{c}1\\1
\end{array}\right).
\end{align*}
```
A demonstration is shown in{cite:p}`bartholinus`.

### Half-Wave Plates

A half-wave plate introduces a phase shift of $\pi$, so its Jones matrix is

```{math}
\begin{align*}
{\cal M}_{HWP}=
\left( \begin{array}{cc}1&0\\0& -1
\end{array}\right),
\end{align*}
```
because $\exp(i\pi)=-1$. An important application of the half-wave plate is to **change the orientation of linearly polarized light**{cite:p}`fowles`. After all, what this matrix does is mirroring the polarization state in the $x$-axis. Thus, if we choose our mirroring axis correctly (i.e. if we choose the orientation of the wave plate correctly), we can change the direction in which the light is linearly polarized arbitrarily{cite:p}`goldstein`. To give an example: a wave with linear polarization parallel to the $x$-direction, can be rotated over angle $\alpha$ by rotating the crystal such that the fast axis makes angle $\alpha/2$ with the $x$-axis. Upon propagation through the crystal, the slow axis gets an additional phase of $\pi$, due to which the electric vector makes angle $\alpha$ with the $x$-axis (see {numref}`fig:pol:rotationPolarization`). It is not difficult to verify that when the fast and slow axis are interchanged, the same linear state of polarization results.

```{figure} Images/04_05_rotation_polarization.png
:name: fig:pol:halfWaveRotation
Rotation of horizontally polarized light over an angle $\alpha$ using a half-wave plate.
```


### Full-Wave Plates

A full-wave plate introduces a phase difference of $2\pi$, which is the same as introducing no phase difference between the two field components.
So what can possibly be an application for a full-wave plate? We recall from
{eq}`eq:pol:waveplatePhaseShift` that the phase difference is $2\pi$ only for
a particular wavelength. If we send through linearly (say vertically) polarized
light of other wavelengths, these will become elliptically polarized, while the
light with the correct wavelength $\lambda_0$ will stay vertically polarized. If
we then let all the light pass through a horizontal polarizer, the light with
wavelength $\lambda_0$ will be completely extinguished, while the light of other
wavelengths will be able to pass through at least partially. Therefore, *
*full-wave plates can be used to filter out specific wavelengths of light**.

## More on Jones matrices

If the direction of either the slow or fast axis is given and the ordinary and
extra-ordinary refractive indices $n_o$ and $n_e$, it is easy to write down the
Jones matrix of a birefringent plate of given thickness $d$ using the rotation
matrices, see {eq}`eq:pol:rotatedJonesMatrix`. Instead of using the rotation
matrices, one can also write down a system of equations for the elements of the
Jones matrix. Suppose
that $\hat{\mathbf{v_o}}=v_{o,x}+\hat{\mathbf{x}}+v_{o,y}\hat{\mathbf{y}}$
and $\hat{\mathbf{v_e}}=v_{e,x}\hat{\mathbf{x}}+ v_{e,y} \hat{\mathbf{y}}$, are
in the direction of the ordinary and the extra-ordinary axes, respectively. Then
if the Jones matrix is

```{math}
:label: eq:pol:generalJonesMatrix
{\cal M}=\left( \begin{array}{cc}a & b \\c & d
\end{array}\right),
```

then

```{math}
\begin{align*}
{\cal M} \hat{\mathbf{v}}_o & = e^{i k n_o d} \, \hat{\mathbf{v}}_o,  \\
{\cal M} \hat{\mathbf{v}}_e & = e^{i k n_e d} \, \hat{\mathbf{v}}_e
\end{align*}
```
which implies

```{math}
:label: eq:pol:jonesEigenvectorSystem
\begin{array}{cc}a v_{o,x} + b v_{o,y} & = e^{i k n_o d} v_{o,x}, \\c v_{o,x} + d v_{o,y} & = e^{i k n_o d} v_{o,y}, \\a v_{e,x} + b v_{e,y} & = e^{i k n_e d} v_{e,x}, \\c v_{e,x} + d v_{e,y} & = e^{i k n_e d} v_{e,x}.
\end{array}
```

Similarly, for a linear polarizer it is simple to write down the Jones matrix if
one knows the direction in which the polarizer absorbs or transmits all the
light: use {eq}`eq:pol:linearPolarizerMatrix` in combination with the rotation
matrices. Alternatively, if $\hat{\mathbf{v}}$ is in the direction of the linear
polarizer and $\hat{\mathbf{w}}$ is perpendicular to it, we have

```{math}
\begin{align*}
{\cal M} \hat{\mathbf{v}} & = \hat{\mathbf{v}}  \\
{\cal M} \hat{\mathbf{w}} & = \mathbf{0},
\end{align*}
```

which is a system of equation of type {eq}`eq:pol:jonesEigenvectorSystem` for
the elements of the Jones matrix.

Suppose now that the complex (2,2)-matrix
{eq}`eq:pol:generalJonesMatrix` is given.
How can one verify whether this matrix corresponds to a linear polarizer or to a wave plate?
Note that the elements of a Jones matrix are in general complex.


**1.** **Linear polarizer**.
The matrix corresponds to a linear polarizer if there is a real vector which remains invariant under ${\cal M}$ and all vectors orthogonal to this vector are mapped to zero. In other words, there must be an orthogonal basis of **real** eigenvectors and one of the eigenvalues must be 1 and the other 0.
Hence, to check that a given matrix corresponds to a linear polarizer, one should verify that one eigenvalue is 1 and the other is 0 and furthermore that the eigenvectors are **real** orthogonal vectors. It is important to check that the eigenvectors are real because if they are not, they do not correspond to particular linear polarization directions and then the matrix does not correspond to a linear polarizer.

**2.** **Wave plate**.
To show that the matrix corresponds to a wave plate, there should exist two **real** orthogonal eigenvectors with, in general, complex eigenvalues of modulus 1. In fact, one of the eigenvectors corresponds to the ordinary axis with refractive index $n_{o}$, and the other to the extra-ordinary axis with refractive index $n_e$. The eigenvalues are then

```{math}
\begin{align*}
e^{i k n_1 d} \;\;\text{ and } \;\; e^{i k n_2 d},
\end{align*}
```
where $d$ is the thickness of the plate and $k$ is the wave number. Hence to verify that a $(2,2)$-matrix corresponds to a wave plate, one has to compute the eigenvalues and check that these have modulus 1 and that the corresponding eigenvectors are real vectors and orthogonal.

**3.** **Jones matrix for propagation through sugars** In sugars, left and right
circular-polarized light propagate with their own refractive index. Therefore
sugars are called **circular birefringent**. The matrix {eq}`eq:pol:generalJonesMatrix` corresponds to propagation through sugar when
there are two real orthogonal unit vectors
$\hat{\mathbf{v}}$ and $\hat{\mathbf{w}}$ such that the circular polarization states

$$
\hat{\mathbf{v}}+ i \hat{\mathbf{w}}, \;\;\;
\hat{\mathbf{v}}- i \hat{\mathbf{w}}
$$

are eigenstates of ${\cal M}$ with complex eigenvalues with modulus 1.


## Decomposition of an Elliptical polarization state into sums of Linear \& of Circular States
Any elliptical polarization state can be written as the sum of two perpendicular linear polarized states:

```{math}
:label: eq:pol:ellipticalAsLinearSum
\begin{align*}
J=
\left(\begin{array}{cc}{\cal A}_x e^{i \varphi_x} \\{\cal A}_y e^{i \varphi_y}
\end{array}\right) = {\cal A}_x e^{i \varphi_x} \left( \begin{array}{c}1\\0
\end{array} \right) + {\cal A}_y e^{i \varphi_y} \left(\begin{array}{c}0 \\1
\end{array}\right).
\end{align*}
```
Furthermore, any elliptical polarization state can be written as the sum of two circular polarization states, one right- and the other left-circular polarized:

```{math}
:label: eq:pol:ellipticalAsCircularSum
\begin{align*}
J=
\left(\begin{array}{c}{\cal A}_x e^{i \varphi_x} \\{\cal A}_y e^{i \varphi_y}
\end{array}\right) =\frac{1}{2}({\cal A}_x e^{i \varphi_x} - i {\cal A}_y e^{i \varphi_y}) \left( \begin{array}{c}1\\i
\end{array}\right) + \frac{1}{2} ( {\cal A}_x e^{i \varphi_x} + i {\cal A}_y e^{i \varphi}) \left(\begin{array}{c}1 \\-i
\end{array}\right).
\end{align*}
```
We conclude that to study what happens to elliptic polarization, it suffices to consider two orthogonal linear polarizations, or, if that is more convenient, left- and right-circular polarized light. In a birefringent material each of two linear polarizations, namely parallel to the o-axis and parallel to the e-axis, propagate with their own refractive index. To predict what happens to an arbitrary linear polarization state which is not aligned to either of these axes, or more generally what happens to an elliptical polarization state, we write this polarization state as a linear combination of o- and e-states, i.e. we expand the field on the o- and e-basis.

To see what happens to an arbitrary elliptical polarization state in a circular birefringent material, the incident light is best written as linear combination of left-and right-circular polarizations.

## Chapter Summary

- **Polarization** describes the orientation of the electric field vector oscillation in an electromagnetic wave.
- **Linear polarization**: The electric field oscillates in a fixed direction; described by Jones vector with real components.
- **Circular polarization**: The electric field rotates at constant amplitude; left-circular and right-circular have opposite handedness.
- **Elliptical polarization**: The most general state; the electric field traces an ellipse, characterized by the ellipticity angle.
- **Jones vectors** represent polarization states as 2D complex vectors; **Jones matrices** describe how optical elements transform polarization.
- **Polarizers** transmit one polarization and block the orthogonal one; **Malus's Law** gives transmitted intensity as $I = I_0 \cos^2\theta$.
- **Birefringence** occurs when a material has different refractive indices for different polarization directions.
- **Wave plates**: Quarter-wave plates convert linear to circular polarization (and vice versa); half-wave plates rotate linear polarization.
- **Optical activity** rotates the plane of polarization as light propagates through certain materials.
- **Stokes parameters** provide a complete description of partially polarized light, including unpolarized components.

```{note} External sources in recommended order
1. [Double Vision - Sixty Symbols](https://www.youtube.com/watch?v=k1oh3lXR5PE): Demonstration of double refraction by a calcite crystal due to birefringence.
2. [MIT OCW - Linear Polarizer](https://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/linear-polarizer/): Demonstration of linear polarizers and linear polarization.
3. [MIT OCW - Polarization Rotation Using Polarizers](https://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/polarization-rotation-using-polarizers/): Demonstration of polarization rotation using linear polarizers.
4. [Demonstration of a QuarterWavePlate](https://www.youtube.com/watch?v=ZhkcKlksV1g) by Andrew Berger.
5. [MIT OCW - Quarter-wave Plate](https://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/quarter-wave-plate/): Demonstration of the quarter-wave plate to create elliptical (in particular circular) polarization.
6. [Demonstration of a HalfWavePlate](https://www.youtube.com/watch?v=HriBBJ-6gd8) by Andrew Berger.
7. [MIT OCW - Half-wave Plate](https://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/half-wave-plate/): Demonstration of the half-wave plate.
```


[^1]: The phase difference $\varphi_y-\varphi_x$ is sometimes called the retardation.

[^2]: For more details, see Born and Wolf, *Principles of Optics*, Chapter 3.

[^3]: This is why calcite crystals were used in Viking navigation - they could see two images of the sun through clouds and determine its position.

[^4]: For more information about polarization states and Jones vectors, see Hecht, *Optics*, Chapter 8.

[^5]: For details on creating and manipulating polarization states, see Saleh and Teich, *Fundamentals of Photonics*, Chapter 6.

[^6]: The concept of birefringence was first discovered by Erasmus Bartholinus in 1669.

[^7]: For more information about wave plates and their applications, see Fowles, *Introduction to Modern Optics*, Chapter 3.

[^8]: For a detailed treatment of Jones matrices, see Goldstein, *Polarized Light*, Chapter 4.

## References

<!-- Bibliography is rendered from references.bib in HTML output -->
