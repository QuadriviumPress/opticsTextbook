# Problems

**Problem 2.1** Principle of Fermat and Snell's Law.

Consider a layer of thickness $d$ and refractive index $n_2$ which is sandwiched between two half spaces with refractive indices $n_1$ and $n_3$ as shown in {numref}`fig:geo:slab`.
A ray from point $P=(x_P,y_P)$ with $y_P>d$ passes through point $Q=(x_Q,y_Q)$ with $y_Q<0$.

```{figure} ../Images/02_16_slab.png
:name: fig:geo:slab
A ray through points $P$ and $Q$.
```

**(a)** Write a formula for the OPL of the ray from $P$ to $Q$ as shown in {numref}`fig:geo:slab`.

**(b)** Find the equations to be satisfied by $x_A$ and $x_B$ such that the OPL is minimum.
Hint: set the partial derivatives of the OPL with respect to $x_A$ and $x_B$ equal to zero.

**(c)** Express the equations derived under b) in terms of $\sin \theta_1$, $\sin \theta_2$ and $\sin \theta_3$ and derive that Snell's Law holds for the angles $\theta_1$ and $\theta_3$:

```{math}
:label: eq:geo:snellMultilayer
\begin{align*}
n_1 \sin \theta_1 = n_3 \sin \theta_3.
\end{align*}
```
Note that the relationship between $\theta_3$ and $\theta_1$ is independent of the refractive index $n_2$ and the thickness $d$ of the middle layer.

**(d)** Does Snell's Law {eq}`eq:geo:snellMultilayer` hold irrespective of
  the number of layers and their thicknesses in between the two half spaces?
Explain your answer.

**(e)** Derive {eq}`eq:geo:snellMultilayer` by using the boundary conditions
  for the tangential components of the electromagnetic field, using Maxwell's
  boundary conditions for electromagnetic fields.

From electromagnetic theory, the wave trains emitted by different atoms (point sources) in the source suffer random phase jumps due to e.g. collisions and therefore the fields emitted by different point sources in an extended classical light source can not interfere.

**Problem 2.2** Perfect focusing by an ellipsoid and a hyperboloid.

Suppose that there are two media with refractive indices $n_1>n_2$ and that point $S$ is at infinity in the medium with refractive index $n_2$. We will construct a surface (interface) between the two media such that all rays from $S$ are focused into the same point $F$ (see {numref}`fig:geo:focusRight`a). Because $S$ is at a very large distance, the rays entering from the right are parallel. Since all parallel rays have traveled the same distance when they hit the surface $DD'$ perpendicular to the rays, all parallel rays have the same phase at their intersection points with the plane $DD'$.

**(a)** If point $A$ is on the interface sought, derive that

```{math}
:label: eq:geo:hyperbolaCondition
\begin{align*}
\frac{n_2}{c} |DA| + \frac{n_1}{c}|AF| = \text{constant},
\end{align*}
```
where the constant is the same for all points $A$ on the interface.

**(b)** Show that by moving the plane $DD'$ parallel to itself we can achieve that for the new plane $DD'$ Insert the omitted equation after the colon.

**(c)** Suppose next that $n_2>n_1$, as shown at the right of {numref}`fig:geo:focusRight`. Show that now, by the same argument as above, the interface is a hyperboloid with $F$ as one of its focal points.

```{figure} ../Images/02_17_focus_left.png
:name: fig:geo:focusRight
(a) Ellipsoid ($n_2<n_1$) and (b) hyperboloid ($n_2>n_1$) to perfectly focus a parallel beam incident from the medium with refractive index $n_2$ into a point in a medium with refractive index $n_1$.
```

**(d)** Use the previous results to describe a lens with refractive index $n_2>n_1$ and having hyperboloid surfaces which perfectly image two given points S and P in the ambient medium with refractive index $n_1$.

```{figure} ../Images/02_18_perfect_imaging.png
:name: fig:geo:perfectImagingProblem
Lens with hyperboloid surfaces for perfect imaging of a pair of points.
```


**Problem 2.3** Perfect focussing by a parabolic mirror

Next we consider perfect focusing of parallel rays in air ($n=1$) by a mirror.
Let there be a parallel bundle of rays in air ($n=1$) and suppose we want to focus all rays at point $F$.

**(a)** We draw a plane $\Sigma_1$ perpendicular to the rays as shown in {numref}`fig:geo:paraMirror`. The rays that hit $\Sigma_1$ have traversed the same optical path length.
Draw a second surface $\Sigma_2$ parallel to $\Sigma_1$. Consider rays hitting the mirror at $A_1$ and $A_2$.
Derive that

```{math}
:label: eq:geo:parabolicMirrorOpl1
\begin{align*}
\text{OPL}=|W_1A_1| + |A_1F|= |W_2A_2| + |A_2F|.
\end{align*}
```

**(b)** Derive that

```{math}
:label: eq:geo:parabolicMirrorOpl2
\begin{align*}
|W_1A_1| + |A_1D_1|= |W_2A_2| + |A_2D_2|.
\end{align*}
```

**(c)** Show that
  {eq}`eq:geo:parabolicMirrorOpl1` is satisfied for points $A$ for
  which $|AF|=|AD|$,
and conclude that the mirror is a paraboloid with $f$ as focus and $\Sigma_2$ as directrix.

```{figure} ../Images/02_19_paraboloid_mirror_bw.png
:name: fig:geo:paraMirror
A paraboloid mirror.
```

**Problem 2.4** Imaging of a virtual object.

A virtual object is at a distance $d_0$ behind a converging lens. The converging incident rays to the left of the lens, that correspond to the virtual object, are shown in {numref}`fig:geo:virtualObject`. The lens has focal length $f$.

```{figure} ../Images/02_20_virtual_object.png
:name: fig:geo:virtualObject
An object is created by incoming rays.
```

**(a)** Construct the image when $f=2$ cm, $d_0=4$ cm and the height of the object is 1 cm.

**(b)** Is the image real or virtual? Inverted or upright?

**(c)** Calculate the location of the image using the lens formula and compare it with your drawing. What is the magnification?

**Problem 2.5** Suppose we have two thin lenses ${\cal L}_1$ and ${\cal L}_2$. Lens ${\cal L}_1$ is convergent (i.e. positive) with focal distance $f_1>0 $ and lens ${\cal L}_2$
is divergent (i.e. negative) with focal distance $f_2<0$. The distance between the lenses is $d$.
Let there be an object at distance $2f_1$ in front of lens ${\cal L}_1$, as shown in
{numref}`fig:geo:twoThinLensesCD`.

```{figure} ../Images/02_21_two_thin_lenses_c_d.png
:name: fig:geo:twoThinLensesCD
 Figure corresponding to Exercise "A convergent and divergent lens".
```


**(a)** Derive the condition on the distance $d$ between the lenses such that the final image is real.

**(b)** Let $f_1=3~\text{cm}$ and $f_2=-2~\text{cm}$.
What should be the distance $d$ such that the final image is real and the magnification is 2?

**Problem 2.6** System matrix for imaging by a spherical surface.

Consider a spherical surface with radius of curvature $R$, with a medium of refractive index $n_1$ ($n_2$) to the left (right) of the surface with refractive index $n_1$ ($n_2$).

**(a)** Derive the ray matrix between a plane to the left of the surface at a distance $d_1$ from the vertex and a plane to the right of the surface at a distance $d_2$ from the vertex. (As always the rays are assumed to propagate from the left to the right).

**(b)** Derive the conditions such that the plane at distance $d_2$ is the
  image of the plane at distance $d_1$. Express the formula in
  coordinates $s_o=-d_1$, $s_i=d_2$ with respect to the vertex as origin and
  show that the result is identical to formula {eq}`eq:geo:singleSurfacePowerForm`

**(c)** Assume that
$n_1=1$, $n_2=2$ and $R= 2$ cm.
Show by construction using the paraxial version of Snell's Law that when the object is virtual with $s_o=-4$ cm, the coordinate of the image point is given by $s_i= 8$ cm, in agreement with the formula derived in b).

**(d)** Construct again the image when $s_o=-4$ cm but now for the case that $R=-2$ cm and verify that the coordinate $s_i$ of the image point agrees with the formula derived in b).


**Problem 2.7** The purpose of this problem is to derive the Lensmaker's formula for a thin lens by applying the imaging formula of a spherical surface twice.
The image $P$ of a point $S$ as shown in {numref}`fig:geo:sphericalLens` is computed in two steps. First the intermediate image $P'$ of $S$ by the spherical surface with vertex $V_1$ is computed and then this intermediate image is imaged by the spherical surface with vertex $V_2$.

```{figure} ../Images/02_22_spherical_lens.png
:name: fig:geo:sphericalLens
A spherical lens made of glass of index $n_l$ in a medium of index $n_m$. The point $S$ is imaged in $P$.
```

**(a)** Use {eq}`eq:geo:singleSurfacePowerForm` to deduce that when $S$ is
  imaged by the first spherical surface as if the second spherical surface were
  absent, the $z$-coordinate $s_{i1}$ of the image $P'$ with respect to the
  origin at $V_1$ satisfies:

$$
-\frac{n_m}{s_{o1}}+\frac{n_l}{s_{i1}} =\frac{n_l-n_m}{R_1},
$$
where $s_{o1}$ is the $z$-coordinate of $S$ with respect to the origin in $V_1$.

**(b)** Show that with respect to the origin at $V_2$ the $z$-coordinate of $P'$ is

$$
s_{o2}= s_{i1}-d.
$$

**(c)** Show that the $z$-coordinate $s_{i2}$ of P with respect to the origin at $V_2$ satisfies

$$
-\frac{n_l}{s_{o2}}+\frac{n_m}{s_{i2}}=\frac{n_m-n_l}{R_2}.
$$

**(d)** Add the results of a) and c) to derive

$$
-\frac{n_m}{s_{o1}} + \frac{n_m}{s_{i2}}
= (n_l-n_m)\left( \frac{1}{R_1}-\frac{1}{R_2}\right) + \frac{n_l d}{(s_{i1}-d) s_{i1}}.
$$


**(e)** Derive the Lensmaker's formula for the thin lens
  (see the {ref}`Ray Matrix chapter <chapter:ray>`) by taking the limit $d\rightarrow 0$ in d).

**Problem 2.8** System matrix for focusing.

Consider a ray transfer matrix

```{math}
:label: eq:geo:matrix
\begin{align*}
\left( \begin{array}{cc}A & B \\C & D
\end{array}\right)
\end{align*}
```
between two planes.

**(a)** Suppose that any ray that is parallel to the optical axis in the first plane goes through a point on the optical axis in the second plane. This means that the second plane is the image focal plane of the system. What does this imply for the elements of the transfer matrix?


**(b)** Suppose that the first plane is the object focal plane, so that any ray emitted by the point on the optical axis in the first plane becomes collimated in the second plane. What does this imply for the elements of the transfer matrix?

**(c)** Consider two thin lenses with distance $d$ and focal distances $f_{1i}$ and $f_{2i}$. Derive the transfer matrix linking the plane immediately before the first lens with the plane immediately behind the second lens. You may assume that the lenses are in air with refractive index $n=1$.

**(d)** Use the condition that you found in a) to derive the image focal
  distance of a system consisting of two thin lenses with image focal
  distances $f_{1i}$ and $f_{2i}$ and distance $d$. Verify that the result
  agrees with the distance for the image focal plane {eq}`eq:ray:twoLensImageFocal`.
Hint: let $f_i$ be the distance of the image focal point of the two-lens system to the second lens. Write the transfer matrix between the plane immediately before the first lens and the plane through the image focal point.

**(e)** Add a third thin lens with image focal distance $f_{3i}$ in contact with the second lens. Derive the ray matrix of this system.

**(f)** Let $f_i$ be the distance from the image focal plane to the third lens. Use the condition derived in a) and the ray matrix derived in e) to derive $f_i$.

**Problem 2.9** Matrix for two thin lenses.

**(a)** Consider two thin lenses which are surrounded by a medium with refractive index $n$. Let the left and right lenses have powers ${\cal P}_1$ and ${\cal P}_2$, respectively and let the distance between their vertices be $d$.
Derive that the matrix between the planes immediately to the left of the first lens and the plane immediately to the right of the second lens is given by

```{math}
:label: eq:geo:twoLensMatrix
\left( \begin{array}{cc}1-\frac{d}{n}{\cal P}_1 & -{\cal P}_1-{\cal P}_2 - \frac{d}{n}{\cal P}_1{\cal P}_2 \\\frac{d}{n} & 1-\frac{d}{n}{\cal P}_2
\end{array}\right).
```

**(b)** Show that the coordinates of the image and object focal points are given by:

```{math}
:label: eq:geo:imageFocalTwoLens
f_i = \frac{P_1+P_2 + \frac{d}{n} {\cal P}_1{\cal P}_2}{n \left( 1 - \frac{d}{n}\right){\cal P}_2 }
```


```{math}
:label: eq:geo:objectFocalTwoLens
f_o = \frac{P_1+P_2 + \frac{d}{n} {\cal P}_1{\cal P}_2}{n \left( 1 - \frac{d}{n}\right){\cal P}_1 }.
```

**(c)** Verify that these formulae are equivalent to {eq}`eq:ray:twoLensObjectFocal`,{eq}`eq:ray:twoLensImageFocal`.


**Problem 2.10** Entrance pupil of a system of two lenses.
Consider a system of two lenses $L_1$ and $L_2$ with distance $d$. The left lens $L_1$ has image focal distance $f_{1i}$ and $a_1$, $a_2$ are the radii of the lens apertures of $L_1$ and $L_2$.

**(a)** Let lens $L_1$ be convergent with $f_{1i}=2~\text{cm}$ and let the distance be $d=1~\text{cm}$. Furthermore, let $a_1=2~\text{cm}$ and $a_2=1~\text{cm}$. Determine by construction with a ruler the entrance pupil. Compute also its position and radius using the Lensmakers' formula and derive the tangent of the angle that the marginal ray makes with the optical axis for an object on the optical axis at 4 cm to the left of $L_1$.

**(b)** Same question when $L_1$ is a divergent lens with $f_{1i}=-6~\text{cm}$, $d=3~\text{cm}$ and $a_1=a_2=1~\text{cm}$.


**Problem 2.11** Diaphragm in a system of two thin lenses. The purpose of this problem is to determine the entrance and exit pupils of a system consisting of two thin lenses with a diaphragm using three methods: construction, applying the Lensmaker's formula and the matrix method.
The situation is as shown in {numref}`fig:geo:twoThinLenses`. The focal distances of the two thin lenses are $f_1=10$ cm and $f_2=12$ cm and their distance
$d = 6$ cm. Suppose that the aperture stop is as shown in {numref}`fig:geo:twoThinLenses`. It is at a distance of $ 1.5$ cm in front of the lens $L_1$ and has a diameter $D_a=5$ cm.

```{figure} ../Images/02_23_two_thin_lenses.png
:name: fig:geo:twoThinLenses
Optical system with two thin lenses and an aperture stop. Lens L₁ (focal length f₁ = 10 cm) and lens L₂ (focal length f₂ = 12 cm) are separated by distance d = 6 cm, with an aperture diaphragm (diameter Dₐ = 5 cm) positioned 1.5 cm in front of L₁. This configuration is used to analyze entrance and exit pupils.
```


**(a)** Determine the position of the entrance pupil and its diameter $D_{e}$ by the mentioned three methods.


**(b)** Determine the position of the exit pupil and its diameter $D_{exit}$ by the mentioned three methods.


**(c)** Compute the $f$-number of the system.
