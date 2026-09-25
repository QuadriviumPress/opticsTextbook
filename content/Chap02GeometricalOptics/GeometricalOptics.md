---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.16.7
tags:
  - geometrical-optics
  - foundational
  - theory
downloads:
  - id: chapter-02-pdf
    title: Download Chapter PDF
  - id: chapter-02-docx
    title: Download Chapter DOCX
---

(chapter:geo)=
# Geometrical Optics


```{note} What you should know and be able to do after studying this chapter
- Principle of Fermat.
- Understand the approximation made in Gaussian geometrical optics.
- Know how to work with the sign convention of the Lens Maker's Formula (not the derivation of the formula).
- Understand how the Lens Maker's Formula of a single lens follows from the formula for a single interface.
- Understand how the image of two and more lenses is derived from that of a single lens by construction and by computing the intermediate images. You do not need to know the imaging equation and the formulae for the focal distances of two thin lenses.
- Understand the matrix method (you do not need to know the matrices by heart).
- Understand the modification of the lens model to incorporate a thick lens.
- Understand the limitations of geometrical optics, in particular when diffraction optics is needed.
```
```{phet} geometric-optics
:label: fig:geo-geometric-optics-sim

Place a lens or mirror, drag the object, and watch real and virtual images form. This is the interactive companion to the Gaussian imaging constructions later in the chapter.
```

## Introduction
Geometrical optics is an old subject, but it is still essential to understand and design optical instruments such as cameras, microscopes, telescopes etc. Geometrical optics started long before light was described as a wave as is done in wave optics, and long before it was discovered that light is an electromagnetic wave and that optics is part of electromagnetism.

In this chapter, we go back in history and treat geometrical optics. That may seem strange now that we have a much more accurate and better theory at our disposal. However, the predictions of geometrical optics are under quite common circumstances very useful and also very accurate. In fact, for many optical systems and practical instruments there is no alternative to geometrical optics because more accurate theories are much too complicated to use.

When a material is illuminated, its molecules start to radiate spherical waves (more precisely, they radiate like tiny electric dipoles) and the total wave scattered by the material is the sum of all these spherical waves. A time-harmonic wave has at every point in space and at every instant of time a well defined phase.
A **wave front** is a set of space-time points where the phase has the same value. At any fixed time, the wave front is called a surface of constant phase. This surface moves with the phase velocity in the direction of its local normal.

For plane waves, we have shown in the previous chapter that the surfaces of constant phase are planes and that the normal to these surfaces is in the direction of the wave vector which coincides with the direction of the phase velocity as well as with the direction of the flow of energy (the direction of the Poynting vector). For general waves, the local direction of energy flow is given by the direction of the Poynting vector. Provided that the radius of curvature of the surfaces is much larger than the wavelength, the normal to the surfaces of constant phase may still be considered to be in the direction of the local flow of energy. Such waves behave locally as plane waves and their effect can be accurately described by the methods of geometrical optics.

Geometrical optics is based on the intuitive idea that light consists of a bundle of rays. But what is a ray?


```{note}
A ray is an oriented curve which is everywhere perpendicular to the surfaces of constant phase and points in the direction of the flow of energy.
```

Consider a point source at some distance before an opaque screen with an aperture. According to the ray picture, the light distribution on a second screen further away from the source and parallel to the first screen is simply an enlarged copy of the aperture (see {numref}`fig:geo:geomDiffr`). The copy is enlarged due to the fanning out of the rays. However, this description is only accurate when the wavelength of the light is very small compared to the diameter of the aperture. If the aperture is only ten times the wavelength, the pattern is much broader due to the bending of the rays around the edge of the aperture. This phenomenon is called **diffraction**. Diffraction cannot be explained by geometrical optics and will be studied in {ref}`chapter:diff`.


```{figure} Images/02_01_figgeom.png
:name: fig:geo:geomDiffr
Light distribution on a screen due to a rectangular aperture. Left: for a large aperture, we get an enlarged copy of the aperture. Right: for an aperture that is of the order of the wavelength there is strong bending (diffraction) of the light.
```
Geometrical optics is accurate when the sizes of the objects in the system are large compared to the wavelength. It is possible to derive geometrical optics from Maxwell's equations by formally expanding the electromagnetic field in a power series in the wavelength and retaining only the first term of this expansion[^geometrical_optics_derivation]. However, this derivation is not rigorous because the power series generally does not converge (it is a so-called asymptotic series).

Although it is possible to incorporate polarization into geometrical optics, this is not standard theory and we will not consider polarization effects in this chapter.

[^geometrical_optics_derivation]: See e.g. Born and Wolf, *Principles of Optics*, Chapter 1.


## Principle of Fermat

The starting point of the treatment of geometrical optics is the

```{important}
**Principle of Fermat (1657)**. The path followed by a light ray between two points is the one that takes the least amount of time.
```

The speed of light in a material with refractive index $n$ is $c/n$, where $c=3\times 10^8$ m/s is the speed of light in vacuum. At the time of Fermat, the conviction was that the speed of light must be finite, but nobody could suspect how incredibly large it actually is. In 1676 the Danish astronomer Ole R&ouml;mer computed the speed from inspecting the eclipses of a moon of Jupiter and arrived at an estimate that was only 30\% too low.

Let $\mathbf{r}(s)$ be a ray with $s$ the length parameter. The ray links two points $S$ and $P$.
Suppose that the refractive index varies with position: $n(\mathbf{r})$. Over the infinitesimal distance from $s$ to
$s+\mathrm{d}s$, the speed of the light is

```{math}
:label: eq:geo:speedLightMedium
\begin{align*}
\frac{c}{n(\mathbf{r}(s))}.
\end{align*}
```
Hence the time it takes for light to go from $\mathbf{r}(s)$ to $\mathbf{r}(s+\mathrm{d}s)$ is:

```{math}
:label: eq:geo:infinitesimalTime
\begin{align*}
\mathrm{d}t = \frac{n(\mathbf{r}(s))}{c} \mathrm{d}s,
\end{align*}
```
and the total time to go from $S$ to $P$ is:

```{math}
:label: eq:geo:totalTravelTime
\begin{align*}
t_{S \rightarrow P} = \int_0^{s_P} \frac{n(\mathbf{r}(s))}{c} \mathrm{d}s,
\end{align*}
```
where $s_P$ is the distance along the ray from S to P.
The **optical path length** [m] of the ray between S and P is defined by:


```{math}
:label: eq:geo:opticalPathLength
\begin{align*}
\text{OPL} = \int_0^{s_P} n(\mathbf{r}(s)) \mathrm{d}s,
\end{align*}
```

So the OPL is the distance weighted by the refractive index.

```{note}
Fermat's principle is thus equivalent to the statement that a ray follows the path with shortest OPL.
```


```{figure} Images/02_02_theory_of_mirage.jpg
:name: fig:geo:theoryOfMirage
Because the temperature close to the ground is higher, the refractive index is lower there. Therefore the rays bend upwards, creating a mirror image of the tree below the ground. (From Popular Science Monthly Volume 5, Public Domain, [link](https://commons.wikimedia.org/w/index.php?curid=10770493)).
```

**Remark.**
Actually, Fermat's principle as formulated above is not complete. There are circumstances in which a ray can take two paths between two points that have different travel times. Each of these paths then corresponds to a minimum travel time compared to nearby paths, so the travel time is in general a *local minimum*. An example is the reflection by a mirror discussed in the following section.

## Some Consequences of Fermat's Principle
- **Homogeneous matter**

In homogeneous matter, the refractive index is constant and therefore paths of shortest OPL are straight lines. Hence in homogeneous matter rays are straight lines.
- **Inhomogeneous matter**

When the refractive index is a function of position, as in air with a temperature gradient, the rays bend towards regions of higher refractive index. In the case of {numref}`fig:geo:theoryOfMirage` for example, on a warm day, the ray from the top of the tree to the eye of the observer passes close to the ground because there the temperature is higher and hence the refractive index is smaller. Although the curved path is longer than the straight path, the total travel time of the light is less because near the ground the light speed is higher (since the refractive index is smaller). The observer gets the impression that the tree is upside down under the ground.

- **Law of reflection**


Consider the mirror shown in {numref}`fig:geo:descartesReflection`. Since the medium above the mirror is homogeneous, a ray from point $P$ can end up in $Q$ in two ways: by going along a straight line directly from $P$ to $Q$ or alternatively by straight lines via the mirror. Both possibilities have different path lengths and hence different travel times, and hence both are local minima mentioned at the end of the previous section. We consider here the path by means of reflection by the mirror.
Let the $x$-axis be the intersection of the mirror and the plane through the points $P$ and $Q$ and perpendicular to the mirror. Let the $y$-axis be normal to the mirror. Let $(x_P, y_P)$ and $(x_Q,y_Q)$ be the coordinates of $P$ and $Q$, respectively. If $(x,0)$ is the point where a ray from $P$ to $Q$ hits the mirror, the travel time of that ray is

```{math}
:label: eq:geo:mirrorTravelTime
\begin{align*}
\frac{n}{c}d_1(x) + \frac{n}{c}d_2(x) = \frac{n}{c}\sqrt{ (x-x_P)^2 + y_P^2} +\frac{n}{c} \sqrt{ (x_Q-x)^2 + y_Q^2},
\end{align*}
```
where $n$ is the refractive index of the medium in $y>0$. According to Fermat's Principle, the point $(x,0)$ should be such that the travel time is at a minimum, i.e.

```{math}
:label: eq:geo:mirrorMinimumCondition
\begin{align*}
\frac{d }{d x} [d_1(x) + d_2(x)] = \frac{(x-x_P)}{d_1(x)} - \frac{(x_Q-x)}{d_2(x)} =0.
\end{align*}
```
Hence

```{math}
:label: eq:geo:reflectionSineEquality
\begin{align*}
\sin \theta_i = \sin \theta_r,
\end{align*}
```
or

```{math}
:label: eq:geo:reflectionLaw
\begin{align*}
\theta_r = \theta_i.
\end{align*}
```
where $\theta_i$ and $\theta_r$ are the angles of incidence and reflection as shown in {numref}`fig:geo:descartesReflection`.


```{figure} Images/02_03_descartes_reflection.png
:name: fig:geo:descartesReflection
Ray from $P$ to $Q$ via the mirror.
```


- **Snell's law of refraction**


Next, we consider refraction at an interface. Let $y=0$ be the interface between a medium with refractive index $n_i$ in $y>0$ and a medium with refractive index $n_t$ in $y<0$. We use the same coordinate system as in the case of reflection above. Let $(x_P,y_P)$ and $(x_Q,y_Q)$ with $y_P>0$ and $y_Q<0$ be the coordinates of two points $P$ and $Q$ as shown in {numref}`fig:geo:descartesRefraction`. What path will a ray follow that goes from $P$ to $Q$? Since the refractive index is constant in both half spaces, the ray is a straight line in both media. Let $(x,0)$ be the coordinate of the intersection point of the ray with the interface. Then the travel time is

```{math}
:label: eq:geo:refractionTravelTime
\begin{align*}
\frac{n_i}{c} d_1(x) + \frac{n_t}{c} d_2(x) = \frac{n_i}{c} \sqrt{(x-x_P)^2 + y_P^2} +
\frac{n_t}{c} \sqrt{(x_Q-x)^2 + y_Q^2}.
\end{align*}
```
The travel time must be at a minimum; hence, the following condition must hold:

```{math}
:label: eq:geo:refractionMinimumCondition
\begin{align*}
\frac{d}{d x} \left[ n_i d_1(x) + n_t d_2(x)\right] = n_i \frac{(x-x_P)}{d_1(x)} - n_t \frac{(x_Q-x)}{d_2(x)}=0.
\end{align*}
```

where the travel time has been multiplied by the speed of light in vacuum. {eq}`eq:geo:refractionMinimumCondition` implies

```{math}
:label: eq:geo:snellLaw
\begin{align*}
n_i \sin \theta_i = n_t \sin \theta_t,
\end{align*}
```
where $\theta_i$ and $\theta_t$ are the angles between the ray and the normal to the surface in the upper half space and the lower half space, respectively ({numref}`fig:geo:descartesRefraction`).

```{figure} Images/02_04_descartes_refraction.png
:name: fig:geo:descartesRefraction
Ray from $P$ to $Q$ refracted by an interface.
```

```{phet} bending-light
:label: fig:geo-bending-light-sim

Refraction and reflection at a planar interface with adjustable indices. Measure $\theta_i$ and $\theta_t$ and check that $n_i\sin\theta_i = n_t\sin\theta_t$ matches the protractor — the same Snell's law just derived from Fermat's principle.
```

+++

Hence we have derived the law of reflection and Snell's law from Fermat's principle. In {ref}`chapter:basics` the reflection law and Snell's law have been derived by a different method, namely from the continuity of the tangential electromagnetic field components at the interface.

## Perfect Imaging by Conic Sections
In this section, the conic sections ellipse, hyperbola and parabola are important. In {numref}`fig:geo:conicSection` their definitions are shown as a quick reminder[^3].

```{figure} Images/02_05_conic_section.png

Geometric construction of conic sections (ellipse, hyperbola, and parabola) showing their traditional definitions. The ellipse is the locus of points with constant sum of distances to two foci, the hyperbola has a constant difference of distances, and the parabola maintains equal distances to a focus and a directrix.
```
```{figure} Images/02_06_conic_section.png
:name: fig:geo:conicSection
Overview of conic sections. The lower figure shows a definition that unifies the three definitions in the figure above by introducing a parameter called the eccentricity $e$. The point $F$ is the focus and the line $e=\infty$ is the directrix of the conic sections.
```

We start by explaining what in geometrical optics is meant by **perfect imaging**.
Let $S$ be a point source. The rays perpendicular to the spherical wave fronts emitted by $S$ radially fan out from $S$. Due to objects such as lenses etc. the spherical wave fronts are deformed and the directions of the rays are made to deviate from the radial propagation direction.
When there is a point $P$ and a cone of rays coming from point $S$ and all rays in that cone intersect in point $P$, then by Fermat's principle, all these rays have traversed paths of minimum travel time. In particular, their travel times are equal and therefore they **all add up in phase** when they arrive in $P$. Hence at $P$ there is a high light intensity. Hence, if there is a cone of rays from point $S$ which all intersect in a point $P$ as shown in {numref}`fig:geo:perfectImaging`, point $P$ is called the **perfect image** of $S$.
By reversing the direction of the rays, $S$ is similarly a perfect image of $P$.
The optical system in which this happens is called **stigmatic for the two
points $S$ and $P$**.


```{figure} Images/02_07_perfect_imaging.png
:name: fig:geo:perfectImaging
Perfect imaging: a cone of rays which diverge from $S$ and all intersect in point $P$. The rays continue after $P$.
```


**Remark**. The concept of a perfect image point exists only in geometrical optics. In reality, finite apertures of lenses and other imaging systems cause diffraction due to which image points are never perfect but blurred.

We summarize the main examples of stigmatic systems.

**1.**
**Perfect focusing and imaging by refraction.** A parallel bundle of rays propagating in a medium with refractive index $n_2$ can be focused into a point $F$ in a medium with refractive index $n_1$. If $n_2>n_1$, the interface between the media should be a hyperbola with focus $F$, whereas if $n_2<n_1$ the interface should be an ellipse with focus $F$. By reversing the rays we obtain perfect collimation. Therefore, a point $S$ in air can be perfectly imaged onto a point $F$ in air by inserting a piece of glass in between them with hyperbolic surfaces. These properties are derived in Problem 2.2.

**2.**
**Perfect focusing of parallel rays by a mirror**.
A bundle of parallel rays in air can be focused into a point $F$ by a mirror of parabolic shape with $F$ as focus. This is derived in Problem 2.3.
By reversing the arrows, we get (within geometrical optics) a perfectly parallel beam.
Parabolic mirrors are used everywhere, from automobile headlights to radio telescopes.

**Remark.**

Although we found that conic surfaces give perfect imaging for a certain pair of points, other points do *not* have perfect images in the sense that for a certain cone of rays, all rays are refracted (or reflected) to the same point.


```{note} External sources in recommended order
- [KhanAcademy - Geometrical Optics](https://www.khanacademy.org/science/physics/geometric-optics): Playlist on elementary geometrical optics.
- [Yale Courses - 16. Ray or Geometrical Optics I](https://www.youtube.com/watch?v=bxGgcgSbQBA) - Lecture by Ramamurti Shankar
- [Yale Courses - 17. Ray or Geometrical Optics II](https://www.youtube.com/watch?v=qm4QR_ycRhY) - Lecture by Ramamurti Shankar
```

## Gaussian Geometrical Optics
We have seen that, although by using lenses or mirrors which have surfaces that are conic sections we can perfectly image a certain pair of points, for other points the image is not perfect. The imperfections are caused by rays that make larger angles with the **optical axis**, i.e. with the symmetry axis of the system. Rays for which these angles are small are called **paraxial rays**.
Because for paraxial rays the angles of incidence and transmission at the surfaces of the lenses are small,
the sines of the angles in Snell's Law are replaced by the angles themselves:

```{math}
:label: eq:geo:snellParaxial
\begin{align*}
n_i \theta_i = n_t \theta_t \quad \text{(paraxial rays only)}.
\end{align*}
```
This approximation greatly simplifies the calculations. When only paraxial rays are considered, one may replace any surface by a sphere with the same curvature at its vertex. Errors caused by replacing a surface by a sphere are of second order in the angles the ray makes with the optical axis and hence are insignificant for paraxial rays.
Spherical surfaces are not only simpler in the derivations but they are also much easier to manufacture. Hence in the optical industry spherical surfaces are used a lot. To reduce imaging errors caused by non-paraxial rays one applies two strategies: 1. adding more spherical surfaces; 2. replacing one of the spherical surfaces (typically the last before image space) by a non-sphere.


```{note}
In Gaussian geometrical optics only paraxial rays and spherical surfaces are considered. In Gaussian geometrical optics every point has a perfect image.
```

```{openlyceum} OpticsLab
:screen: 2
:label: fig:geo-optics-lab-sim

An open optical bench: rays, parallel and divergent beams, lenses, mirrors, and refracting interfaces. Build the single-surface and thin-lens geometries of this section and watch where the rays meet.
```

(sec:geo:gaussianSss)=
### Gaussian Imaging by a Single Spherical Surface

We will first show that within Gaussian optics a single spherical surface
between two media with refractive indices $n_1< n_2$ images all points
perfectly ({numref}`fig:geo:sphericalInterface`). The sphere has radius $R$
and center $C$ which is inside medium 2. We consider a point object $S$ to the
left of the surface. We draw a ray from $S$ perpendicular to the surface. The
point of intersection is $V$. Since for this ray the angle of incidence with the
local normal on the surface vanishes, the ray continues into the second medium
without refraction and passes through the center $C$ of the sphere. Next we draw
a ray that hits the spherical surface at some point $A$ and draw the refracted
ray in medium 2 using Snell's law in the paraxial form {eq}`eq:geo:snellParaxial`. Note that the angles of incidence and transmission must
be measured with respect to the local normal at $A$, i.e. with respect to $CA$.
We assume that this ray intersects the first ray at point $P$. We will show that
within the approximation of Gaussian geometrical optics, all rays from $S$ pass
through $P$.
Furthermore, with respect to a coordinate system $(y,z)$ with origin at $V$, the $z$-axis pointing from $V$ to $C$ and the $y$-axis positive upwards as shown in {numref}`fig:geo:sphericalInterface`, we have:

```{math}
:label: eq:geo:singleSurfaceImaging
\begin{align*}
-\frac{n_1}{s_o } + \frac{n_2}{s_i} = {\cal P},
\end{align*}
```
where

```{math}
:label: eq:geo:surfacePower
{\cal P} = \frac{n_2-n_1}{R},
```

is called the power of the surface and where $s_o$ and $s_i$ are the $z$-**coordinates** of $S$ and $P$, respectively, hence $s_0<0$ and $s_i>0$ in {numref}`fig:geo:sphericalInterface`.

```{figure} Images/02_08_spherical_interface.png
:name: fig:geo:sphericalInterface
Imaging by a spherical interface between two media with refractive indices $n_2>n_1$.
```

*Proof*.

It suffices to show that $P$ is independent of the ray, i.e. of $A$. We will do this by expressing $s_i$ in terms of $s_o$ and showing that the result is independent of $A$. Let $\alpha_1$ and $\alpha_2$ be the angles of the rays $SA$ and $AP$ with the $z$-axis as shown in {numref}`fig:geo:sphericalInterface`.
Let $\theta_i$ be the angle of incidence of ray $SA$ with the local normal $CA$ on the surface and $\theta_t$ be the angle of refraction. By considering the angles in triangle $\Delta \text{SCA}$ we find


```{math}
:label: eq:geo:incidentAngleTriangle
\begin{align*}
\theta_i = \alpha_1 + \varphi.
\end{align*}
```
Similarly, from $\Delta \,\text{CPA}$ we find

```{math}
:label: eq:geo:refractedAngleTriangle
\begin{align*}
\theta_t=-\alpha_2 + \varphi.
\end{align*}
```

By substitution into the paraxial version of Snell's Law {eq}`eq:geo:snellParaxial`, we obtain

```{math}
:label: eq:geo:paraxialSnellAngles
\begin{align*}
n_1 \alpha_1 + n_2 \alpha_2 = (n_2-n_1)
\varphi.
\end{align*}
```
Let $y_A$ and $z_A$ be the coordinates of point $A$. Since $s_o<0$ and $s_i>0$ we have

```{math}
:label: eq:geo:angleApproximations
\begin{align*}
\alpha_1 \approx \tan(\alpha_1) = \frac{y_A}{z_A-s_o}, \;\; \;\; \alpha_2\approx \tan(\alpha_2)= \frac{y_A}{s_i-z_A}.
\end{align*}
```
Furthermore,

```{math}
:label: eq:geo:smallAngleVarphi
\begin{align*}
\varphi \approx \sin \varphi \approx \frac{y_A}{R}.
\end{align*}
```
which is small for paraxial rays.
Hence,

```{math}
:label: eq:geo:pointACoordinate
\begin{align*}
z_A=R-R\cos\varphi = R - R\left(1-\frac{\varphi^2}{2}\right)= \frac{R}{2}\varphi^2 \approx 0,
\end{align*}
```

because it is second order in $y_A$ and therefore is neglected in the paraxial
approximation. Then, {eq}`eq:geo:angleApproximations`
becomes

```{math}
:label: eq:geo:simplifiedAngles
\begin{align*}
\alpha_1 = -\frac{y_A}{s_o}, \quad \alpha_2 =\frac{y_A}{s_i}.
\end{align*}
```

By substituting {eq}`eq:geo:simplifiedAngles` and {eq}`eq:geo:smallAngleVarphi` into {eq}`eq:geo:paraxialSnellAngles` we find

```{math}
\begin{align*}
-\frac{n_1}{s_o} y_A + \frac{n_2}{z_i} y_A = \frac{n_2-n_1}{R} y_A,
\end{align*}
```
or

```{math}
\begin{align*}
-\frac{n_1}{s_o } + \frac{n_2}{s_i} = \frac{n_2-n_1}{R},
\end{align*}
```

which is {eq}`eq:geo:singleSurfaceImaging`.
It implies that $s_i$, and hence $P$, is independent of $y_A$, i.e. of the ray chosen.
Therefore, $P$ is a perfect image within the approximation of Gaussian geometrical optics.


When
$s_o \rightarrow -\infty$, the incident rays are parallel to the $z$-axis in medium 1 and the corresponding image point $F_i$ is called the **second focal point** or **image focal point**.
Its $z$-coordinate is given by:


```{math}
:label: eq:geo:imageFocalDistance
\begin{align*}
	f_i = \frac{n_2}{{\cal P}}=\frac{n_2 R}{n_2-n_1},
	\end{align*}
```

The absolute value of $f_i$ is called the **second focal length** or **image focal length**. The signed value $f_i$ is negative when $n_2<n_1$.
When $s_i\rightarrow \infty$, the rays after refraction are parallel to the $z$-axis and we get $s_o \rightarrow -n_1 R/(n_2-n_1)$. The object point for which the rays in medium 2 are parallel to the $z$-axis is called the **first focal point** or **object focal point** $F_o$. Its $z$-coordinate is:


```{math}
:label: eq:geo:objectFocalDistance
\begin{align*}
f_o=-\frac{n_1}{{\cal P}}= -\frac{n_1 R}{n_2-n_1}.
\end{align*}
```

The absolute value $|f_o|$ of $f_o$ is called the **front focal length** or **object focal length**.

With {eq}`eq:geo:imageFocalDistance` and {eq}`eq:geo:objectFocalDistance`,
{eq}`eq:geo:singleSurfaceImaging` can be rewritten as:


```{math}
:label: eq:geo:singleSurfacePowerForm
\begin{align*}
-\frac{n_1}{s_o} + \frac{n_2}{s_i} = {\cal P} =-\frac{n_2}{f_i}= -\frac{n_1}{f_o}.
\end{align*}
```


(sec:geo:virtualSss)=
### Virtual Images and Virtual Objects of a Single Spherical Surface

If we adopt the sign convention listed in
{numref}`table:geo:signconv` below,
it turns out that {eq}`eq:geo:singleSurfaceImaging` holds generally. So far we
have considered a convex surface of which the center $C$ is to the right of the
surface, but {eq}`eq:geo:singleSurfaceImaging` applies also to a concave
surface of which the center is to the left of the surface, provided that the
radius $R$ is chosen negative.
The convention for the sign of the radius is illustrated in {numref}`fig:geo:radius`.

```{figure} Images/02_09_radius_convention.png
:name: fig:geo:radius
Sign convention for the radius $R$ of a spherical surface
```

If the power ${\cal P}$ given by {eq}`eq:geo:surfacePower` is positive, then
the surface makes bundles of incident rays convergent or less divergent.
If the power is negative, incident bundles are made divergent or less convergent. The power of the surface can be negative for two reasons:
1) $R$>0 and $n_1>n_2$, or
2) $R$<0 and $n_1<n_2$, but the effect of the two cases is the same.
   For any object to the left of the surface: $s_o<0$, {eq}`eq:geo:singleSurfacePowerForm` and a negative power imply that $s_i<0$,
   which suggests that the image is to the left of the surface. Indeed, in both cases, the diverging ray bundle emitted by S is made more strongly divergent by the surface. By extending these rays in image space back to object space (without refraction at the surface), they are seen to intersect in a point $P$ to the left of the surface. This implies that for an observer at the right of the surface it looks as if the diverging rays in image space are emitted by $P$. Because there is no actual concentration of light intensity at $P$, it is called a **virtual image**, in contrast with the **real images** that occur to the right of the surface and where there is an actual concentration of light energy. We have in this case $f_o>0$ and $f_i<0$, which means that the object and image focal points are to the right and left, respectively, of the surface.

Note that also when the power is positive, a virtual image can occur, namely when the object $S$ is in between the object focal point $F_o$ and the surface. Then the bundle of rays from S is so strongly diverging that the surface cannot convert it into a convergent bundle and hence again the rays in image space seem to come from a point $P$ to the left of the surface. This agrees with the fact that when ${\cal P}>0$ and $f_o< s_o<0$,
{eq}`eq:geo:singleSurfacePowerForm` implies that $s_i<0$.


```{figure} Images/02_10_concave_surface_real_object_1.png
:name: fig:geo:surfConcave
Imaging by a concave surface ($R<0$) with $n_2>n_1$. All image points are to the left of the surface, i.e. are virtual ($s_i<0$).
```


Finally we look at a case in which there is a bundle of convergent rays incident on the surface from the left. If extended into the right medium without refraction, these rays would intersect in a point $S$. Since this point is not actually present, it is called a **virtual object point**, in contrast to **real object points** which are to the left of the surface. The coordinate of a virtual object point is positive: $s_o>0$.
One may wonder why we look at this case. The reason is that if we have several
spherical surfaces behind each other, we can compute the image of an object
point by first determining the intermediate image by the leftmost surface and
then use this intermediate image as the object for the next surface and so on.
In such a case, it can easily happen that an intermediate image is to the right
of the next surface and hence is a virtual object for that surface. In the case
of {numref}`fig:geo:convexVirtualObject` at the left, the power is positive,
hence the convergent bundle of incident rays is made even more convergent which
leads to a real image point. Indeed when $s_o>0$ and ${\cal P}>0$ then {eq}`eq:geo:singleSurfaceImaging` implies that always $s_i>0$. At the right of
{numref}`fig:geo:convexVirtualObject` the power is negative but is not
sufficiently strong to turn the convergent incident bundle into a divergent
bundle. So the image is still real. However, the image will be virtual when the
virtual object $S$ is to the right of $F_o$ (which in this case is to the right
of the surface) since then the bundle of rays converges so weakly that the
surface turns it into a divergent bundle.


```{figure} Images/02_11_spherical_interface_concave.png
:name: fig:geo:convexVirtualObject
Imaging of a virtual object $S$ by a spherical interface with $R>0$ between two media with refractive indices $n_1>n_2$ (left) and $n_2>n_1$ (right).
```

In conclusion: provided the sign convention listed in {numref}`table:geo:signconv`
is used, formula {eq}`eq:geo:singleSurfaceImaging`
can always be used to determine the image of a given object by a spherical surface.

The convention for $s_o$, $f_o$, $s_i$, $f_i$ follows from the fact that these are $z$-coordinates with the origin at vertex $V$ of the spherical surface (or the center of the thin lens) and the positive $z$-axis is pointing to the right. The convention for the $y$-coordinate follows from the fact that the $y$-axis is positive upwards.

```{table}
:name: table:geo:signconv

Sign convention for spherical surfaces and thin lenses

| **quantity** | **positive** | **negative** |
| :--: | :--: | :--: |
| $s_o$, $s_i$. $f_0$, $f_i$ | corresponding point is to the right of vertex | corresponding point is to the left of vertex |
| $y_o$, $y_i$ | object, image point above optical axis | object, image point below optical axis |
| $R$ | center of curvature right of vertex | center of curvature left of vertex |
| Refractive index $n$ of the ambient medium of a mirror | before reflection | after reflection |
```


(sec:geo:stops)=

### Stops

An element such as the rim of a lens or a diaphragm which determines the set of rays that can contribute to the image is called the **aperture stop**. An ordinary camera has a variable diaphragm.

The **entrance pupil** is the image of the aperture stop by all elements to the left of the aperture stop. In constructing the entrance pupil, rays are used which propagate from the right to the left. The image can be real or virtual. If there are no lenses between object and aperture stop, the aperture stop itself is the entrance pupil. Similarly, the **exit pupil** is the image of the aperture stop by all elements to the right of it. This image can be real or virtual. The entrance pupil determines for a given object the cone of rays in object space that contribute to the image, while the cone of rays leaving the exit pupil is the one taking part in image formation (see {numref}`fig:geo:apertureStop`).

For any object point, the **chief ray** is the ray in the cone that passes through the center of the entrance pupil, and hence also through the centers of the aperture stop and the exit pupil. A marginal ray is the ray that for an object point on the optical axis passes through the rim of the entrance pupil (and hence also through the rims of the aperture stop and the exit pupil).

For a fixed diameter $D$ of the exit pupil and for given $x_o$, the
transverse-magnification relation
$M=y_i/y_o = s_i/s_o = -x_i/f_i$ and Newton's lens equation $x_o x_i = -f_i^2$
(see the {ref}`Ray Matrix chapter <chapter:ray>`) give $M=-x_i/f_i=f_i/x_o$. It follows that when $f_i$ is increased, the
magnification increases.
A larger magnification means a lower energy density, hence a longer exposure time, i.e. **the speed of the lens is reduced**. Camera lenses are usually specified by two numbers: the focal length $f$, measured with respect to the exit pupil, and the diameter $D$ of the exit pupil. The **$f$-number** is the ratio of the focal length to this diameter:


```{math}
:label: eq:geo:fNumberDefinition
\begin{align*}
\text{f-number}=f/D.
\end{align*}
```

For example, f-number$=2$ means $f = 2D$. Since the exposure time is proportional to the square of the f-number, a lens with f-number 1.4 is twice as fast as a lens with f-number 2.


```{figure} Images/02_12_aperture_stop.png
:name: fig:geo:apertureStop
Aperture stop (A.S.) between the second and third lenses, with entrance pupil and exit pupil (in this case these pupils are virtual images of the aperture stop). Also shown are the chief ray and the marginal ray.
```


## Beyond Gaussian Geometrical Optics

### Aberrations
For designing advanced optical systems Gaussian geometrical optics is not sufficient.
Instead non-paraxial rays, and among them also non-meridional rays, must be traced using software based on Snell's Law with the sine of the angles of incidence and refraction. Often many thousands of rays are traced to evaluate the quality of an image.
It is then found that in general the non-paraxial rays do not intersect at the ideal Gaussian image point. Instead of a single spot, a spot diagram is found which is more or less confined. The deviation from an ideal point image is quantified in terms of **aberrations**. One distinguishes between monochromatic and chromatic aberrations. The latter are caused by the fact that the refractive index depends on wavelength.
Recall that in paraxial geometrical optics Snell's Law {eq}`eq:geo:snellLaw` is
replaced by: $n_i \theta_i = n_t \theta_t$, i.e. $\sin \theta_i$
and $\sin \theta_t$ are replaced by the linear terms. If instead one retains the
first two terms of the Taylor series of the sine, the errors in the image can be
quantified by five monochromatic aberrations, the so-called **primary** or *
*Seidel aberrations**. The best known is **spherical aberration**, which is
caused by the fact that for a convergent spherical lens, the rays that make a
large angle with the optical axis are focused closer to the lens than the
paraxial rays (see {numref}`fig:geo:aberrationLens`).

```{figure} Images/02_13_aberration_lens.png
:name: fig:geo:aberrationLens
Spherical aberration of a planar-convex lens.
```

**Distortion** is one of the five primary aberrations. It causes deformation of images due to the fact that the magnification depends on the distance of the object point to the optical axis.

For high-quality imaging,
the aberrations have to be reduced by adding more lenses and optimizing the curvatures of the surfaces,
the thicknesses of the lenses and the distances between them.
For high-quality systems, a lens with an aspherical surface is sometimes used.
Systems with very small aberrations are extremely expensive, in particular if the field of view is large,
as is the case in lithographic imaging systems
used in the manufacturing of integrated circuits as illustrated by the lithographic system in {numref}`fig:geo:asmlEuv`.

A comprehensive treatment of aberration theory can be found in Braat et al.[^4].


```{figure} Images/02_14_asml_euv.png
:name: fig:geo:asmlEuv
The EUV stepper TWINSCAN NXE:3400B. Lithographic lens system for DUV (192 nm), costing more than € 500.000. Ray paths are shown in purple. The optical system consists of mirrors because there are no suitable lenses for this wavelength (Courtesy of [ASML](https://www.asml.com/en/news/media-library)).
```


### Diffraction

According to a generally accepted criterion formulated first by Rayleigh, aberrations start to deteriorate images considerably if they cause path length differences of more than a quarter of the wavelength.
When the aberrations are less than this, the system is called **diffraction limited**.

```{figure} Images/02_15_airy_disk.png
:name: fig:geo:airySpot
Left: cross section of the field of the Airy pattern. Right: intensity pattern of the Airy pattern.
```


Even if the wave transmitted by the exit pupil were perfectly spherical (no aberrations), the wave front consists of only a circular section of a sphere since the field is limited by the aperture. An aperture causes **diffraction**, i.e. bending and spreading of the light. When one images a point object on the optical axis, diffraction causes inevitable blurring given by the so-called Airy spot, as shown in {numref}`fig:geo:airySpot`. The Airy spot has a full width at half maximum:

```{math}
:label: eq:geo:airySpotResolution
\begin{align*}
\text{FWHM} = 0.6 \frac{ \lambda}{\text{NA}},
\end{align*}
```
where NA$=\arcsin(a/s_i)$ is the numerical aperture (i.e. 0<NA<1) with $a$ the radius of the exit pupil and $s_i$ the image distance as predicted by Gaussian geometrical optics. Diffraction depends on the wavelength, and hence it cannot be described by geometrical optics, which applies in the limit of vanishing wavelength.  We will treat diffraction by apertures in {ref}`chapter:diff`.

## Chapter Summary

- **Fermat's Principle** states that light follows the path of least time, forming the foundation of geometrical optics.
- In **Gaussian geometrical optics**, the paraxial (small angle) approximation enables analytical treatment of imaging by spherical surfaces.
- The **Lensmaker's Formula** relates object and image distances: $\frac{n_1}{s_o} + \frac{n_2}{s_i} = \frac{n_2 - n_1}{R}$ for a single surface.
- **Real images** form where rays converge; **virtual images** form where rays appear to originate.
- **Spherical aberration** limits imaging quality for rays far from the optical axis; it can be minimized using aspherical surfaces or conic sections.
- **Stops and pupils**: The aperture stop limits the light cone; entrance and exit pupils are its images as seen from object and image space.
- The **f-number** (f/D) characterizes the speed of a camera lens.
- Geometrical optics breaks down when feature sizes approach the wavelength, leading to **diffraction** effects described by the Airy pattern.

[^1]: See Chapter 1 of M. Born \& E. Wolf, "Principles of Optics", Cambridge University Press (2013)

[^2]: R.K. Luneburg, Mathematical Theory of Optics, University of California Press, Berkeley and Los Angeles, 1964

[^3]: For more details on conic sections and their properties in optics, see Jenkins and White, *Fundamentals of Optics*, Chapter 4.

[^4]: For a detailed treatment of perfect imaging by conic sections, see Born and Wolf, *Principles of Optics*, Chapter 4.


```python

```
