---
tags:
  - ray-matrices
  - geometrical-optics
  - advanced
  - mathematics
downloads:
  - id: chapter-11-pdf
    title: Download Chapter PDF
  - id: chapter-11-docx
    title: Download Chapter DOCX
---

(chapter:ray)=
# Ray Vectors and Ray Matrices

```{note} What you should know and be able to do after studying this chapter
- Understand the concept of ray vectors $(n\alpha, y)^T$ and how they describe rays in paraxial optics.
- Know the ray matrices for fundamental optical elements: spherical surfaces, spherical mirrors, and propagation through homogeneous media.
- Apply ray matrix multiplication to analyze optical systems with multiple elements, understanding that matrices are multiplied in reverse order of light propagation.
- Derive and use the lens matrix for both thin and thick lenses, including the concept of optical power $\mathcal{P}$.
- Apply the imaging condition ($C = 0$) to determine when two planes are conjugate (image each other).
- Use the Lensmaker's Formula to relate object and image distances for thin lenses.
- Calculate magnification from ray matrix elements and understand the Newtonian form of the lens equation.
- Analyze two-lens systems and calculate combined focal lengths and magnifications.
- Understand principal planes for thick lenses and how they simplify imaging calculations.
- Distinguish between meridional and skew rays in paraxial theory.
```

Now that we know that within Gaussian geometrical optics a single spherical surface images every object point to a perfect, real or virtual, image point it is easy to see that any row of spherical surfaces separated by homogeneous materials will also image any point perfectly. We first determine the intermediate image of the object point under the most left spherical surface as if the other surfaces are not present and use this intermediate image point as object point for imaging by the next spherical surface and so on. Of course, the intermediate image and object points can be virtual.

Although this procedure is in principle simple, it is nevertheless convenient in Gaussian geometrical optics to introduce the concept of ray vectors and ray matrices to deal with optical system consisting of several spherical surfaces.
With ray matrices it is easy to derive how the distance of a given ray to the optical axis and its direction change during propagation through an optical system. This in turn can be used to determine the image plane in an optical system for a given object plane.

In any plane perpendicular to the $z$-axis, a ray is determined by the $y$-coordinate of the point of intersection of the ray with the plane and the angle $\alpha$ with the optical ($z$)-axis. This angle has a sign and is defined as follows. Let $(y_1,z_1)$ and $(y_2,z_2)$ be the coordinates of two points on the ray and let the light propagate from point 1 to point 2. Then we define

```{math}
:label: eq:ray:angleDefinition
\alpha = \frac{ y_2-y_1}{z_2-z_1}.
```

Examples of positive and negative $\alpha$ are given in {numref}`fig:ray:figAlpha`. The case $z_2-z_1<0$ occurs when a ray propagates in the negative $z$-direction after it has been reflected by a mirror.
According to the sign convention table in the {ref}`Geometrical Optics chapter <chapter:geo>`, the refractive index of the ambient medium should after the reflection be taken negative. After a second reflection due to which the ray propagates again in the positive $z$-direction the refractive index should be chosen positive again.

```{figure} Images/11_03_angle_definition.png
:name: fig:ray:figAlpha
Sign convention for the ray angle. In the upper two figures $\alpha>0$ while in the lower two figures $\alpha<0$.
```


We define the ray vector

```{math}
:label: eq:ray:rayVectorDefinition
\begin{align*}
\left( \begin{array}{c}n\alpha \\y
\end{array} \right),
\end{align*}
```
where $n$ is the local refractive index. The definition with the refractive index as factor in the first element of the ray vector turns out to be convenient.
The ray vectors of a ray in any two planes $z=z_1$, $z=z_2$, with $z_2>z_1$, are related by a so-called ray matrix:

```{math}
:label: eq:ray:generalRayMatrix
\begin{align*}
\left( \begin{array}{c}n_2\alpha_2 \\y_2
\end{array}\right) = {\cal M}
\left( \begin{array}{c}n_1 \alpha_1 \\y_1
\end{array}\right).
\end{align*}
```
where

```{math}
:label: eq:ray:matrixElements
\begin{align*}
{\cal M} =\left( \begin{array}{cc}A & B \\C & D
\end{array}\right).
\end{align*}
```
The elements of matrix ${\cal M}$ depend on the optical components and materials between the planes $z=z_1$ and $z=z_2$.

As an example consider the ray matrix that relates a ray vector in the plane immediately before a spherical surface (see the {ref}`Geometrical Optics chapter <chapter:geo>` for details on spherical interface imaging) to the corresponding ray vector in the plane immediately behind that surface.
Using the paraxial Snell's law and small-angle approximations from the {ref}`Geometrical Optics chapter <chapter:geo>`, it
follows

```{math}
:label: eq:ray:sphericalSurfaceAngles
\begin{align*}
n_1 \alpha_1 - n_2 \alpha_2 = \frac{(n_2-n_1)y_1}{R},
\end{align*}
```

where we have replaced $\alpha_2$ by $-\alpha_2$ in the paraxial Snell's law equation from the {ref}`Geometrical Optics chapter <chapter:geo>`, because according to the sign convention, the
angle $\alpha_2$ should be taken
negative.
Because furthermore $y_2=y_1$, we conclude

```{math}
:label: eq:ray:sphericalSurfaceMatrix
\begin{align*}
\left( \begin{array}{c}n_2\alpha_2 \\    y_2
\end{array}\right) &= \left( \begin{array}{c}n_1 \alpha_1 - \frac{(n_2-n_1)y_1}{R} \\    y_1
\end{array}\right)  \\
    &= \left( \begin{array}{cc}1 & -P \\    0 & 1
\end{array}\right)\left(
    \begin{array}{c}n_1 \alpha_1 \\    y_1
\end{array}\right), \quad \mathbf{spherical surface,}
\end{align*}
```
where

```{math}
:label: eq:ray:surfacePowerDefinition
\begin{align*}
{\cal P}= \frac{n_2-n_1}{R},
\end{align*}
```
is as before the **power** of the surface.

Next we consider a spherical mirror with radius of curvature $R$.
We will show that the ray matrix between the planes just before and after the mirror is given by:

```{math}
:label: eq:ray:sphericalMirrorMatrix
\begin{align*}
\left( \begin{array}{c}n_2\alpha_2 \\y_2
\end{array}\right)
&= \left( \begin{array}{cc}1 & -{\cal P} \\0 & 1
\end{array}\right)\left(
\begin{array}{c}n_1 \alpha_1 \\y_1
\end{array}\right), \quad \mathbf{spherical reflector,}
\end{align*}
```
where

```{math}
:label: eq:ray:mirrorPower
\begin{align*}
{\cal P}= \frac{2n}{R},
\end{align*}
```
is the power of the mirror, $n_1=n$ but $n_2=-n$, because the convention is used that if a ray propagates from **right to left** (i.e. in the negative $z$-direction), the refractive index in the ray vectors and ray matrices is chosen **negative**. Note that when the mirror is flat: $R=\infty$, the ray matrix of the reflector implies

```{math}
\begin{align*}
n_2\alpha_2 = n_1 \alpha_1,
\end{align*}
```

which agrees with the fact that $n_2=-n_1$ and according to {eq}`eq:ray:angleDefinition` $\alpha_2$ and $\alpha_1$ have opposite sign for a
mirror.

```{figure} Images/11_04_concave_mirror.png
:name: fig:ray:mirror
Reflection by a mirror.
```


With all angles positive for the moment, it follows from {numref}`fig:ray:mirror`

```{math}
:label: eq:ray:mirrorIncidentAngle
\begin{align*}
\alpha_1&= \theta_i +\varphi, \end{align*}
```
```{math}
:label: eq:ray:mirrorReflectedAngle
\begin{align*}
\\
\alpha_2 &= \varphi-\theta_r= \varphi-\theta_i.\end{align*}
```
Hence,

```{math}
:label: eq:ray:mirrorAngleRelation
\begin{align*}
\alpha_2= -\alpha_1 + 2\varphi.
\end{align*}
```
Now

```{math}
:label: eq:ray:mirrorSmallAngle
\varphi\approx \frac{y_1}{R}
```

In the situation drawn in {numref}`fig:ray:mirror`, {eq}`eq:ray:angleDefinition` implies that both $\alpha_2$ and $\alpha _1$ are
positive. By choosing the refractive index negative after reflection,
we conclude from {eq}`eq:ray:mirrorAngleRelation` and {eq}`eq:ray:mirrorSmallAngle`:

```{math}
:label: eq:ray:mirrorRayVectorRelation
\begin{align*}
n_2\alpha_2 = -n \alpha_2 = n \alpha_1 - \frac{2n}{R} y_1 = n_1\alpha_1 - \frac{2n}{R} y_1.
\end{align*}
```

This proves {eq}`eq:ray:sphericalMirrorMatrix`.


We now consider the ray matrix when a ray propagates from a plane $z_1$ to a plane $z_2$ through a medium with refractive index $n$.
In that case we have
$\alpha_2=\alpha_1$ and $y_2=y_1 + \alpha_1(z_2-z_1)$, hence

```{math}
:label: eq:ray:homogeneousPropagationMatrix
\begin{align*}
{\cal M}=\left( \begin{array}{cc}1 & 0 \\\frac{z_2-z_1}{n} & 1
\end{array}\right), \quad \mathbf{homogeneous space}.
\end{align*}
```
Note that if the light propagates from the left to the right: $z_2>z_1$ and hence $z_2-z_1$ in the first column and second row of the matrix is positive, i.e. it is the distance between the planes.

For two planes between which there are a number of optical components, possibly separated by regions with homogeneous material (e.g. air), the ray matrix can be obtained by multiplying the matrices of the individual components and of the homogeneous regions. The order of the multiplication of the matrices is such that the **right-most matrix corresponds to the first component that is encountered while propagating**, and so on.

In the ray matrix approach all rays stay in the same plane, namely the plane through the ray and the $z$-axis. These rays are called **meridional rays**. By considering only meridional rays, the imaging by optical systems is restricted to two dimensions. Non-meridional rays are called **skew rays**. Skew rays do not pass through the optical axis and are not considered in the paraxial theory.

**Remarks**.

1. In matrix {eq}`eq:ray:homogeneousPropagationMatrix` $z_1$ and $z_2$ are *
   *coordinates**, i.e. they have a sign.

2. Instead of choosing the refractive index negative in ray vectors of rays that propagate from right to left, one can reverse the direction of the positive $z$-axis after every reflection. The convention to make the refractive index negative is however more convenient in ray tracing software.

3. The determinant of the ray matrices {eq}`eq:ray:sphericalSurfaceMatrix`,
   {eq}`eq:ray:sphericalMirrorMatrix` and
   {eq}`eq:ray:homogeneousPropagationMatrix` are all 1. Since all ray matrices
   considered below are products of these elementary matrices, the determinant
   of every ray matrix considered is unity.

## The Lens Matrix
We apply ray matrices to a lens.
{numref}`fig:ray:sphericalLensSimplified` shows a lens with two spherical surfaces. The refractive index of the lens is $n_l$ and that of the media to the left and to the right of the lens is $n_1$ and $n_2$, respectively. Let the distance between the vertices be $d$.

```{figure} Images/11_05_spherical_lens_simplified.png
:name: fig:ray:sphericalLensSimplified
A lens with thickness $d$. The ray matrix is defined between the planes immediately before and after the lens.
```

```{code-cell} python
:tags: [remove-input]

%%HTML

<!DOCTYPE html>
<html>
<head>
<meta name=viewport content="width=device-width,initial-scale=1">
<meta charset="utf-8"/>
<script src="https://cdn.geogebra.org/apps/deployggb.js"></script>

</head>
<body>
<div id="ggbApplet"></div>

<script>
var parameters = {
"id": "ggbApplet",
"width":"100%",
// "height":695,
"showMenuBar":false,
"showAlgebraInput":false,
"showToolBar":false,
"customToolBar":"0 39 59 || 1 501 67 , 5 19 , 72 | 2 15 45 , 18 65 , 7 37 | 4 3 8 9 , 13 44 , 58 , 47 || 16 51 64 , 70 | 10 34 53 11 , 24  20 22 , 21 23 | 55 56 57 , 12 || 36 46 , 38 49 50 , 71 | 30 29 54 32 31 33 | 17 26 62 , 14 66 68 | 25 52 60 61 || 40 41 42 , 27 28 35 , 6",
"showToolBarHelp":false,
"showResetIcon":false,
"enableLabelDrags":false,
"enableShiftDragZoom":false,
"enableRightClick":false,
"errorDialogsActive":false,
"useBrowserForJS":false,
"allowStyleBar":false,
"preventFocus":false,
"showZoomButtons":false,
"capturingThreshold":3,
// add code here to run when the applet starts
"appletOnLoad":function(api){ /* api.evalCommand('Segment((1,2),(3,4))');*/ },
"showFullscreenButton":false,
"scale":0.428,
"disableAutoScale":false,
"allowUpscale":false,
"clickToLoad":false,
"appName":"classic",
"buttonRounding":0.7,
"buttonShadows":false,
"language":"en-GB",
// use this instead of ggbBase64 to load a material from geogebra.org
// "material_id":"RHYH3UQ8",
// use this instead of ggbBase64 to load a .ggb file
// "filename":"myfile.ggb",
"ggbBase64":"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",
};
// is3D=is 3D applet using 3D view, AV=Algebra View, SV=Spreadsheet View, CV=CAS View, EV2=Graphics View 2, CP=Construction Protocol, PC=Probability Calculator DA=Data Analysis, FI=Function Inspector, macro=Macros
var views = {'is3D': 0,'AV': 0,'SV': 0,'CV': 0,'EV2': 0,'CP': 0,'PC': 0,'DA': 0,'FI': 0,'macro': 0};
var applet = new GGBApplet(parameters, '5.0', views);
window.onload = function() {applet.inject('ggbApplet')};
applet.setPreviewImage('data:image/gif;base64,R0lGODlhAQABAAAAADs=','https://www.geogebra.org/images/GeoGebra_loading.png','https://www.geogebra.org/images/applet_play.png');
</script>
</body>
</html>
```

We will first derive the matrix which maps the ray vector in the plane **immediately in front** of the lens to that in the plane **immediately behind** the lens. Let

```{math}
:label: eq:ray:lensRayVectors
\begin{align*}
\left( \begin{array}{c}n_1 \alpha_1 \\y_1
\end{array}\right)
\;\;\; \text{ and }
\left( \begin{array}{c}n_2 \alpha_2 \\y_2
\end{array}\right)
\end{align*}
```

be two vectors in the two planes which correspond to the same ray. The ray is
first refracted by the spherical surface with radius $R_1$ and center $C_1$.
Using {eq}`eq:ray:sphericalSurfaceMatrix` and {eq}`eq:ray:surfacePowerDefinition` it follows that the matrix between the ray
vectors just before and just behind the spherical surface with radius $R_1$ and
center $C_1$ is given by

```{math}
:label: eq:ray:firstSurfaceMatrix
\begin{align*}
{\cal M}_1= \left( \begin{array}{cc}1 & - {\cal P}_1 \\0 & 1
\end{array}\right) ,
\end{align*}
```
where

```{math}
:label: eq:ray:firstSurfacePower
{\cal P}_1 = \frac{n_l-n_1}{R_1}.
```

The ray propagates then over the distance $d$ through the material of which the
lens is made. The matrix that maps ray vectors from the plane inside the lens
immediately behind the left spherical surface to a ray vector in the plane
immediately before the right spherical surface follows from {eq}`eq:ray:homogeneousPropagationMatrix`:

```{math}
:label: eq:ray:lensPropagationMatrix
\begin{align*}
{\cal M}_2=\left( \begin{array}{cc}1 & 0 \\\frac{d}{n_l} & 1
\end{array}\right).
\end{align*}
```
Finally, the matrix that maps ray vectors from the plane in the lens immediately before the second spherical surface to vectors in the plane immediately behind it is

```{math}
:label: eq:ray:secondSurfaceMatrix
\begin{align*}
{\cal M}_3= \left( \begin{array}{cc}1 & -{\cal P}_2 \\0 & 1
\end{array}\right).
\end{align*}
```
with

```{math}
:label: eq:ray:secondSurfacePower
{\cal P}_2 = \frac{n_2-n_l}{R_2}.
```

Hence the matrix that maps ray vectors in the plane immediately before the lens to ray vectors in the plane immediately behind the lens is given by the matrix product:

```{math}
:label: eq:ray:thickLensMatrix
\begin{align*}
{\cal M}&= {\cal M}_3 {\cal M}_2 {\cal M}_1  \\
&= \left( \begin{array}{cc}1 - \frac{d}{n_l}P_2 & -P_1 - P_2 + \frac{d}{n_l} P_1P_2 \\\frac{d}{n_l} & 1 -\frac{d}{n_l}P_1
\end{array}\right), \quad \mathbf{lens}.
\end{align*}
```
The quantity

```{math}
:label: eq:ray:lensPower
\begin{align*}
{\cal P}={\cal P}_1+{\cal P}_2 - \frac{d}{n_l}{\cal P}_1{\cal P}_2
\end{align*}
```
is called the **power** of the lens. It has dimension 1/length and is given in diopter (${\cal D}$), where $1 \,\, {\cal D}=\text{m}^{-1}$. The power can be positive and negative.
The space to the left of the lens is called the **object space** and that to the right of the lens is called the **image space**.

(sec:ray:focthin)=
## Focusing with a Thin Lens

```{openlyceum} OpticsLab
:screen: 2
:label: eq:ray:fig:ray-optics-lab-sim

Place a thin lens on the bench, send in a parallel beam, and measure where it crosses the axis — the second focal point of the matrix ${\cal M}$ derived above. Add an off-axis object ray and recover the imaging relation of the next section.
```

For a thin lens the vertices $V_1$ and $V_2$ coincide and $d=0$, hence {eq}`eq:ray:thickLensMatrix` becomes

```{math}
:label: eq:ray:thinLensMatrix
\begin{align*}
{\cal M} = \left( \begin{array}{cc}1 & -P\\0 & 1
\end{array}\right), \quad \mathbf{thin lens},
\end{align*}
```
where

```{math}
:label: eq:ray:thinLensPower
P=P_1+P_2 = \left( \frac{n_l-n_1}{R_1}-\frac{n_2-n_l}{R_2}\right),
```

The origin of the coordinate system is chosen in the common vertex $V_1=V_2$.

By considering a ray in medium 1 which is parallel to the optical axis ($\alpha_1=0$) and at height $y_1$, we get $n_2 \alpha_2= - Py_1$ and $y_2=y_1$. Hence, when $P>0$, the angle $\alpha_2$ of the ray has sign opposite to $y_2$ and therefore the ray in image space is bent back to the optical axis, yielding a **second focal point** or **image focal point** $F_i$. Its
$z$-coordinate $f_i$ s:

```{math}
:label: eq:ray:thinLensImageFocal
\begin{align*}
f_i = \frac{\alpha_2}{y_2} = \frac{n_2}{{\cal P}}.
\end{align*}
```
For a ray emerging in image space at height $y_2$ and parallel to the optical axis: $\alpha_2=0$, we have $y_1=y_2$ and
```{math}
\begin{align*}
n_1\alpha_1 = P y_1.
\end{align*}
```
If the power is positive: ${\cal P}>0$, the angle $\alpha_1$ has the same sign as $y_1$, which implies that the ray in object space has intersected the optical axis in a point $F_o$ with $z$-coordinate: $z=f_o$

```{math}
:label: eq:ray:thinLensObjectFocal
\begin{align*}
f_o = -\frac{y_1}{\alpha_1} = -\frac{n_1}{{\cal P}}.
\end{align*}
```
The point $F_o$ is called the **first focal point** or **object focal point**.

We conclude that when the power ${\cal P}$ of the lens is positive, $f_i>0$ and $-f_o>0$, which means that the image and object focal points are in the image and object space, respectively, hence they are both real. A lens with positive power is called **convergent** or **positive**. It makes incident bundles of rays convergent or less divergent.

A lens with negative power is called divergent and has $f_i<0$, $-f_o<0$. It makes incident rays more divergent or less convergent.
Incident rays which are parallel to the optical axis are refracted away from the optical axis and seem to come from a point in front of the lens with $z$-coordinate $f_i<0$. Hence the image focal point does not correspond to a location where there is an actual concentration of light intensity, i.e. it is virtual. The object focal point is a virtual object point, because only a bundle of incident rays that are converging to a certain point behind the negative lens can be turned into a bundle of rays parallel to the optical axis.

With the results obtained for the focal coordinates we can rewrite the lens matrix of a thin lens as

```{math}
:label: eq:ray:thinLensMatrixFocal
\begin{align*}
{\cal M} = \left( \begin{array}{cc}1 & -\frac{n_2}{f_i} \\0 & 1
\end{array}\right), \quad \mathbf{thin lens}.
\end{align*}
```


(sec:ray:imagingthinlens)=
## Imaging with a Thin Lens

We first consider a general ray matrix {eq}`eq:ray:generalRayMatrix`, {eq}`eq:ray:matrixElements` between two planes $z=z_1$ and $z=z_2$ and ask the
following question:
what are the properties of the ray matrix such that the two planes are images of each other, or (as this is also called) are each other's conjugate?
Clearly for these planes to be each other's image, we should have that for every point coordinate $y_1$ in the plane $z=z_1$ there is a point with some coordinate $y_2$ in the plane $z=z_2$ such that any ray through $(y_1,z_1)$ (within some cone of rays) will pass through point $(y_2,z_2)$.
Hence for any angle $\alpha_1$ (in some interval of angles) there is an
angle $\alpha_2$ such that {eq}`eq:ray:generalRayMatrix` is valid.
This means that for any $y_1$ there is a $y_2$ such that for all angles $\alpha_1$:

```{math}
:label: eq:ray:imagingYCoordinate
\begin{align*}
y_2=C n_1\alpha_1 + D y_1,
\end{align*}
```
This requires that


```{math}
:label: eq:ray:imagingCondition
\begin{align*}
C=0, \quad \mathbf{condition for imaging}.
\end{align*}
```

The ratio of $y_2$ and $y_1$ IS the magnification $M$. Hence,

```{math}
:label: eq:ray:magnificationDefinition
\begin{align*}
M=\frac{y_2}{y_1} = D,
\end{align*}
```
is the **magnification** of the image (this quantity has sign).

To determine the image by a thin lens we first derive the ray matrix between two planes $z=z_1<0$ and $z=z_2>0$ on either side of the thin lens. The origin of the coordinate system is again at the vertex of the thin lens.
This ray matrix is the product of the matrix for propagation from $z=z_1$ to the plane immediately in front of the lens, the matrix of the thin lens and the matrix for propagation from the plane immediately behind the lens to the plane $z=z_2$:

```{math}
:label: eq:ray:thinLensPlaneMatrix
\begin{align*}
{\cal M} &= \left( \begin{array}{cc}1 & 0 \\\frac{z_2}{n_2} & 1
\end{array}\right) \left( \begin{array}{cc}1 & - {\cal P} \\0 & 1
\end{array}\right) \left( \begin{array}{cc}1 & 0 \\\frac{-z_1}{n_1} & 1
\end{array}\right)  \\
&=
\left( \begin{array}{cc}1+\frac{z_1}{n_1}{\cal P} & -{\cal P} \\-\frac{z_1}{n_1} + \frac{z_2}{n_2} + \frac{z_1z_2}{n_1 n_2}{\cal P} & 1-\frac{z_2}{n_2} {\cal P}
\end{array}\right)
\end{align*}
```

The imaging condition {eq}`eq:ray:imagingCondition` implies:


```{math}
:label: eq:ray:lensmakerFormula
\begin{align*}
-\frac{n_1}{s_o} + \frac{n_2}{s_i}={\cal P},
\quad \bf{Lensmaker's \;\; Formula},
\end{align*}
```
where we have written $s_o=z_1$ and $s_i=z_2$ for the $z$-coordinates of the object and the image.
Because for the thin lens matrix {eq}`eq:ray:thinLensPlaneMatrix`: $D=1-z_2/f_i$, it follows by using {eq}`eq:ray:lensmakerFormula` that the magnification {eq}`eq:ray:magnificationDefinition` is given by

```{math}
:label: eq:ray:thinLensMagnification
\begin{align*}
M = \frac{y_i}{y_o}= 1-\frac{s_i}{f_i}= \frac{s_i}{s_o},
\end{align*}
```
where we have written now $y_o$ and $y_i$ instead of $y_1$ and $y_2$, respectively.

**Remark.**
The Lensmaker's formula for imaging by a thin lens can alternatively be derived
by using the single-surface imaging formula from the {ref}`Geometrical Optics chapter <chapter:geo>` for the two
spherical surfaces of the lens. We first image a given point $S$ by the left
spherical surface using that imaging formula as if the second
surface were absent. The obtained intermediate image $P'$ is then imaged by the
second spherical surface as if the first surface were absent. $P'$ can be a real
or virtual object for the second surface. The derivation is carried out in
Problem 2.5.


Analogous to the case of a single spherical surface, an image is called a **real image** if it is to the right of the lens ($s_i>0$) and is called a **virtual image** when it seems to be to the left of the lens ($s_i<0$). An object is called a **real object** if it is to the left of the lens ($s_o<0$) and is a **virtual object** if it seems to be right of the lens ($s_o>0$).
For a positive lens: ${\cal P}>0$ and hence {eq}`eq:ray:lensmakerFormula`
implies that $s_i>0$ provided $|s_o|>|f_o|$, which means that the image by a
convergent lens is real if the object is further from the lens than the object
focal point $F_o$.
The case $s_o>0$ corresponds to a virtual object, i.e. to the case of a converging bundle of incident rays, which for an observer in object space seems to converge to a point at distance $s_o$ behind the lens.
A convergent lens ($f_i>0$) will then make an image between the lens and the second focal point. In contrast, a diverging lens ($f_i<0$) can turn the incident converging bundle into a real image only if the virtual object point is between the lens and the focal point. If the virtual object point has larger distance to the lens, the convergence of the incident bundle is too weak and the diverging lens then refracts this bundle into a diverging bundle of rays which seem to come from a virtual image point in front of the lens ($s_i<0$).

Instead of using ray matrices, one can construct the image with a ruler.
Consider the imaging of a finite object $S_1S_2$ as shown in {numref}`fig:ray:realImage` for the case that the media to the left and right lens are the same. Let $y_o$ be the y-coordinate of $S_2$. We have $y_o>0$ when the object is above the optical axis.

```{figure} Images/11_06_real_image.png
:name: fig:ray:realImage
Object and image for a thin lens.
```

Draw the ray through the focal point $F_o$ in object space and the ray through the center $V$ of the lens. The first ray becomes parallel in image space. The latter intersects both surfaces of the lens almost in their (almost coinciding) vertices and therefore the refraction is opposite at both surfaces and the ray exits the lens parallel to its direction of incidence. Furthermore, its lateral displacement can be neglected because the lens is thin. (Of course, this is not correct when the refractive indices to the left and right of the lens are different). Hence, **the ray through the center of a thin lens is not refracted**. The intersection in image space of the two rays gives the location of the image point $P_2$ of $S_2$. The image is real if the intersection occurs in image space and is virtual otherwise.
For the case of a convergent lens with a real object with $y_o>0$ as shown in {numref}`fig:ray:realImage`, it follows from the similar triangles
$\Delta\,\text{BV}\text{F}_i$ and $\Delta\, \text{P}_2\text{P}_1\text{F}_i$ that

```{math}
:label: eq:ray:similarTriangles1
\begin{align*}
\frac{y_o}{|y_i|} = \frac{f_i}{s_i -f_i}.
\end{align*}
```

From the similar triangles $\Delta\, \text{S}_2\text{S}_1\text{F}_o$ and $\Delta\, \text{AVF}_o$:

```{math}
:label: eq:ray:similarTriangles2
\begin{align*}
\frac{|y_i|}{y_o}=\frac{f_i}{f_o-s_o}.
\end{align*}
```
here we used $|f_o|=f_i$.
(the absolute value of $y_i$ is taken because according to our sign
convention $y_i$ in {numref}`fig:ray:realImage` is negative whereas {eq}`eq:ray:similarTriangles2` is a ratio of lengths).
By multiplying these two equations we get the **Newtonian form** of the lens equation (valid when $n_2=n_1$):


```{math}
:label: eq:ray:newtonLensEquation
\begin{align*}
x_o x_i =- f_i^2=- f_o^2,
\end{align*}
```

where $x_o$ and $x_i$ are the $z$-coordinates of the object and image relative to those of the first and second focal point, respectively:

```{math}
:label: eq:ray:focalPlaneCoordinates
\begin{align*}
x_o = s_o-f_o, \;\;\; x_i = s_i-f_i.
\end{align*}
```
Hence $x_o$ is negative if the object is to the left of $F_o$ and $x_i$ is positive if the image is to the right of $F_i$.

The **transverse magnification** is

```{math}
:label: eq:ray:transverseMagnification
\begin{align*}
M=\frac{y_i}{y_o} = \frac{s_i}{s_o} = -\frac{x_i}{f_i},
\end{align*}
```
where the second identity follows from considering the similar triangles $\Delta \text{P}_2\text{P}_1\text{F}_i$ and $\Delta \text{BVF}_i$ in {numref}`fig:ray:realImage`.
A positive $M$ means that the image is erect, a negative $M$ means that the image is inverted.

All equations are also valid for a thin negative lens and for virtual objects and images.
Examples of real and virtual object and image points for a positive and a negative lens are shown in {numref}`fig:ray:positiveLens` and {numref}`fig:ray:negativeLens`.

```{figure} Images/11_07_positive_lens.png
:name: fig:ray:positiveLens
Real and virtual objects and images for a convergent thin lens with the same refractive index left and right of the lens, i.e. $-f_o=f_i>0$. In (a) the object is real with $s_o<f_o$ and the image is real as well ($s_i>0$). In (b) the object is between the front focal point and the lens: $f_o< s_o<0$. Then the rays from the object are too divergent for the lens to make them convergent in image space and hence the image is virtual: $s_i<0$. In \(c\) there is a cone of converging rays incident on the lens from the left which, in the absence of the lens, would converge to point $S$ behind the lens. Therefore $S$ is a virtual object ($s_0>0$). The image is real and can be constructed with the two rays shown.
		In (d) $s_i$ is shown as function of $s_o$ for a convergent lens (see {eq}`eq:ray:lensmakerFormula`).
```

```{figure} Images/11_08_negative_lens.png
:name: fig:ray:negativeLens
Real and virtual objects and images for a divergent thin lens with the same refractive index to the left and right of the lens, i.e. $-f_o=f_i<0$. In (a) the object is real, i.e. $s_o<0$. The diverging lens makes the cone of rays from the object more divergent so that the image is virtual: $s_i<0$. When the object is virtual, there is a cone of converging rays incident from the left which after extension to the right of the lens (as if the lens is not present) intersect in the virtual object S ($s_o>0$). It depends on how strong the convergence is whether the diverging lens turns this cone into converging rays or whether the rays keep diverging. In (b) $0<s_o<-f_i$, and the image is real. In c) $s_o>-f_i$ and the image is virtual ($s_i<0$). In (d) $s_i$ is shown as function of $s_o$ for a divergent lens ($f_i<0$ (see {eq}`eq:ray:lensmakerFormula`).
```


(sec:ray:twolenses)=
## Two Thin Lenses

The ray matrix is a suitable method to study the imaging of a system consisting of several thin lenses. For two lenses however, the imaging can still easily be obtained by construction.
We simply construct the image obtained by the first lens as if the second lens were not present and use this image as (possibly virtual) object for the second lens.
In {numref}`fig:ray:doubleLens` an example is shown where the distance between the lenses is larger than the sum of their focal lengths.
First the image $P'$ of $S$ is constructed as obtained by $L_1$ as if $L_2$ were not present.
We construct the intermediate image $P'$ due to lens $L_1$ using ray 2 and 3. $P'$ is a real image for lens $L_1$ and also a real object for lens $L_2$. Ray 3 is parallel to the optical axis between the two lenses and is thus refracted by lens $L_2$ through its back focal point $F_{2i}$. Ray 4 is the ray from $P'$ through the center of lens $L_2$. The image point $P$ is the intersection of ray 3 and 4.

```{figure} Images/11_09_two_thin_lenses_separated.png
:name: fig:ray:doubleLens
Two thin lenses separated by a distance that is larger than the sum of their focal lengths.
```


In the case of {numref}`fig:ray:twoThinLensesClose` the distance $d$ between the two positive lenses is smaller than their focal lengths.
The intermediate image $P'$ is a real image for $L_1$ obtained as the intersection of rays 2 and 4 passing through the object and image focal points $F_{o1}$ and $F_{i1}$ of lens $L_1$. $P'$ is now a virtual object for lens $L_2$. To find its image by $L_2$, draw ray 3 from $P'$ through the center of lens $L_2$ back to $S$ (this ray is refracted by lens $L_1$ but not by $L_2$) and draw ray 4 as refracted by lens $L_2$. Since ray 4 is parallel to the optical axis between the lenses, it passes through the back focal point $F_{2i}$ of lens $L_2$. The intersection point of ray 3 and 4 is the final image point $P$.

```{figure} Images/11_10_two_thin_lenses_close.png
:name: fig:ray:twoThinLensesClose
Two thin lenses at a distance smaller than their focal lengths.
```


It is easy to express the $z$-coordinate $s_i$ with respect to the coordinate system with origin at the vertex $V_2$ of the final image point, in the $z$-component $s_o$ with respect to the origin at the vertex of lens $L_1$ of the object point. We use the Lensmaker's Formula for each lens while taking care that the proper local coordinate systems are used.
The intermediate image $P'$ due to lens $L_1$ has $z$-coordinate $s_{1i}$ with respect to the coordinate system with origin at the vertex $V_1$, which satisfies:

```{math}
:label: eq:ray:firstLensImaging
\begin{align*}
-\frac{1}{s_o} + \frac{1}{s_{1i}}=\frac{1}{f_{1i}}.
\end{align*}
```
As object for lens $L_2$, $P'$ has $z$-coordinate with respect to the coordinate system with origin at $V_2$ given by:
$s_{2o}=s_{1i}-d$, where $d$ is the distance between the lenses. Hence, with $s_i=s_{2i}$ the Lensmaker's Formula for lens $L_2$ implies:

```{math}
:label: eq:ray:secondLensImaging
\begin{align*}
-\frac{1}{s_{1i}-d} + \frac{1}{s_i} = \frac{1}{f_{2i}}.
\end{align*}
```

By solving {eq}`eq:ray:firstLensImaging` for $s_{1i}$ and substituting the
result into {eq}`eq:ray:secondLensImaging`, we find

```{math}
:label: eq:ray:twoLensImageCoordinate
\begin{align*}
s_i = \frac{ -d f_{1i}f_{2i} + f_{2i}(f_{i1}-d)s_o }{f_{1i}(f_{2i}-d) + (f_{1i}+f_{2i}-d) s_o}, \;\;\; \quad \mathbf{two thin lenses}.
\end{align*}
```
By taking the limit $s_o \rightarrow -\infty$, we obtain the $z$-coordinate $f_i$ of the image focal point of the two lenses, while $s_i\rightarrow \infty$ gives the $z$-coordinate $f_o$ of the object focal point:

```{math}
:label: eq:ray:twoLensImageFocal
\begin{align*}
f_i&= \frac{ (f_{1i}-d) f_{2i}}{f_{1i}+f_{2i}-d},
\end{align*}
```

```{math}
:label: eq:ray:twoLensObjectFocal
\begin{align*}
f_o &= -\frac{(f_{2i}-d)f_{1i}}{f_{1i}+f_{2i} - d},
\end{align*}
```

We found in [](#sec:ray:focthin) that when the refractive indices of the
media before and after the lens are the same, the object and image focal lengths
of a thin lens are the identical. However, as follows from {eq}`eq:ray:twoLensImageFocal` and {eq}`eq:ray:twoLensObjectFocal` the object
and image focal lengths are in general different when there are several lenses.

By construction using the intermediate image, it is clear that the magnification of the two-lens system is the product of the magnifications of the two lenses:

```{math}
:label: eq:ray:twoLensMagnification
\begin{align*}
M = M_1 M_2.
\end{align*}
```
**Remarks**.

1. When $f_{1i}+f_{2i}=d$ the focal points are at infinity. Such a system is called **telecentric**.

2. In the limit where the lenses are very close together: $d\rightarrow 0$, {eq}`eq:ray:twoLensImageCoordinate` becomes

```{math}
:label: eq:ray:contactLensesImaging
\begin{align*}
-\frac{1}{s_o } + \frac{1}{s_i} = \frac{1}{f_{1i}} + \frac{1}{f_{2i}}.
\end{align*}
```
The focal length $ f_i$ of the system of two lenses in contact thus satisfies:

```{math}
:label: eq:ray:contactLensesFocal
\begin{align*}
\frac{1}{f_i} = \frac{1}{f_{1i}} + \frac{1}{f_{2i}}.
\end{align*}
```
In particular, by the using two identical lenses in contact, the focal length is halved.

3. Although for two lenses the image coordinate can still be expressed
   relatively easily in the object distance, for systems with more lenses
   finding the overall ray matrix and then using the image condition {eq}`eq:ray:imagingCondition` is a much better strategy.

## The Thick Lens

At the left of {numref}`fig:ray:thickLensPrinciplePlane` a thick lens is shown. The object focal point is defined as the point whose rays are refracted such that the emerging rays are parallel to the optical axis. By extending the incident and emerging rays by straight segments, the points of intersection are found to be on a curved surface, which close to the optical axis, i.e. in the paraxial approximation, is in good approximation a plane perpendicular to the optical axis. This plane is called the **primary principal plane** and its intersection with the optical axis is called the primary principal point $H_1$.

```{figure} Images/11_11_thick_lens_principle_plane.png
:name: fig:ray:thickLensPrinciplePlane
Principal planes of a thick lens, with front and back focal lengths: f.f.l and b.f.l.
```

By considering incident rays which are parallel to the optical axis and therefore focused in the image focal point, the **secondary principal plane** and secondary principal point $H_2$ are defined in a similar way (see the drawing at the right in {numref}`fig:ray:thickLensPrinciplePlane`).
The principal planes can be outside the lens. For meniscus lenses, this is usually the case as shown in {numref}`fig:ray:principlePlanes`.
It can be seen from {numref}`fig:ray:thickLensPrinciplePlane`
that the principal planes are images of each other, with unit magnification. Hence, if an object is placed in the primary principal plane (hypothetically if this plane is inside the lens), its image is in the secondary principal plane. The image is erect and has unit magnification.

```{figure} Images/11_12_principle_planes.png
:name: fig:ray:principlePlanes
Position of the principal planes for several lenses.
```

Now, if the object coordinates and object focal point are defined with respect
to the origin at $H_1$ and the image coordinates and image focal point are
defined with respect to the origin in $H_2$, the Lensmaker's formula {eq}`eq:ray:lensmakerFormula` can also be used for a thick lens.


*Proof*

We recall the result {eq}`eq:ray:thickLensMatrix` for the ray matrix between
the planes through the front and back vertices $V_1$, $V_2$ of a thick lens with
refractive index $n_l$ and thickness $d$:

```{math}
:label: eq:ray:thickLensMatrixFull
\begin{align*}
{\cal M}_{V_1V_2}
&= \left( \begin{array}{cc}1 - \frac{d}{n_l}P_2 & -P \\\frac{d}{n_l} & 1 -\frac{d}{n_l}P_1
\end{array}\right), \quad \mathbf{thick lens},
\end{align*}
```
where

```{math}
:label: eq:ray:surfacePowers
\begin{align*}
P_1= \frac{n_l-n_1}{R_1}, \quad P_2=\frac{n_2-n_l}{R_2},
\end{align*}
```
and $n_1$, $n_2$ are the refractive indices to the left and the right of the lens, respectively, and where

```{math}
:label: eq:ray:thickLensPower
\begin{align*}
P=P_1+P_2 - \frac{d}{n_l}P_1P_2.
\end{align*}
```

If $h_1$ is the $z$-coordinate of the first principal point $H_1$ with respect
to the coordinate system with origin at vertex $V_1$, we have according to {eq}`eq:ray:homogeneousPropagationMatrix` for the ray matrix between the primary
principal plane and the plane through vertex $V_1$

```{math}
:label: eq:ray:principalPlane1Matrix
\begin{align*}
{\cal M}_1=\left( \begin{array}{cc}1 & 0 \\\frac{h_1}{n_1} & 1
\end{array}\right).
\end{align*}
```
Similarly, if $h_2$ is the coordinate of the secondary principal point $H_2$ with respect to the coordinate system with $V_2$ as origin, the ray matrix between the plane through vertex $V_2$ and the secondary principal plane is

```{math}
:label: eq:ray:principalPlane2Matrix
\begin{align*}
{\cal M}_2=\left( \begin{array}{cc}1 & 0 \\\frac{h_2}{n_2} & 1
\end{array}\right).
\end{align*}
```
The ray matrix between the two principle planes is then

```{math}
:label: eq:ray:principalPlanesMatrix
\begin{align*}
{\cal M}_{H_1H_2}= {\cal M}_2 {\cal M}_{V_1V_2}{\cal M}_1.
\end{align*}
```
The coordinates $h_1$ and $h_2$ can be found by imposing to the resulting matrix the imaging condition
{eq}`eq:ray:imagingCondition`: $C=0$ and the condition that the magnification
should be unity: $D=1$, which follows from {eq}`eq:ray:magnificationDefinition`.
We omit the details and only give the resulting expressions here:

```{math}
:label: eq:ray:firstPrincipalDistance
\begin{align*}
h_1 &= \frac{n_1}{n_l} \frac{P_2}{P} d, \end{align*}
```
```{math}
:label: eq:ray:secondPrincipalDistance
\begin{align*}
\\
h_2 &= -\frac{n_2}{n_l} \frac{P_1}{P} d.\end{align*}
```

With these results, {eq}`eq:ray:principalPlanesMatrix` becomes

```{math}
:label: eq:ray:principalPlanesThinForm
\begin{align*}
{\cal M}_{H_1H_2}= \left( \begin{array}{cc}1 & -P \\0 & 1
\end{array}\right).
\end{align*}
```

We see that **the ray matrix between the principal planes is identical to the
ray matrix of a thin lens** {eq}`eq:ray:thinLensMatrix`.
We therefore conclude that if the coordinates in object space are chosen with respect to the origin in the primary principal point $H_1$, and the coordinates in image space are chosen with respect to the origin in the secondary principal point $H_2$, the expressions for the first and second focal points and for the coordinates of the image point in terms of that of the object point are identical to that for a thin lens. An example of imaging by a thick lens is shown in {numref}`fig:ray:thickLensImaging`.

```{figure} Images/11_13_thick_lens_imaging.png
:name: fig:ray:thickLensImaging
Thick-lens geometry. There holds
	 $f_i=f_o$ if the ambient medium left of the lens is the same as to the right of the lens. All coordinates in object and image space are with respect to the origin in $H_1$ and $H_2$, respectively.
```

## Chapter Summary

- **Ray vectors** $(n\alpha, y)^T$ describe a ray by its angle with the axis (weighted by refractive index) and its height.
- **Ray matrices** (ABCD matrices) relate ray vectors before and after optical elements: $\begin{pmatrix}n_2\alpha_2 \\ y_2\end{pmatrix} = \begin{pmatrix}A & B \\ C & D\end{pmatrix}\begin{pmatrix}n_1\alpha_1 \\ y_1\end{pmatrix}$.
- **System matrix**: For multiple elements, multiply matrices in reverse order of light propagation.
- **Propagation matrix**: $\begin{pmatrix}1 & 0 \\ d/n & 1\end{pmatrix}$ for distance $d$ in medium with index $n$.
- **Spherical surface matrix**: Power $\mathcal{P} = (n_2-n_1)/R$; matrix has $-\mathcal{P}$ in upper right.
- **Thin lens matrix**: $\begin{pmatrix}1 & -\mathcal{P} \\ 0 & 1\end{pmatrix}$ where $\mathcal{P} = 1/f$ is the lens power.
- **Imaging condition**: $C = 0$ means two planes are conjugate (image each other).
- **Lensmaker's Formula**: $-\frac{n_1}{s_o} + \frac{n_2}{s_i} = \mathcal{P}$ relates object and image distances.
- **Magnification**: $M = A$ when $C = 0$; **Newton's equation**: $x_o x_i = -f_o f_i$.
- **Two-lens systems**: Combined power $\mathcal{P} = \mathcal{P}_1 + \mathcal{P}_2 - d\mathcal{P}_1\mathcal{P}_2$.
- **Principal planes** for thick lenses: The ray matrix between principal planes equals that of a thin lens.
