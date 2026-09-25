---
tags:
  - mathematics
  - reference
  - electromagnetic-theory
---

(appendix:vectorCalculus)=
# Appendix D: Vector Calculus for Electromagnetic Fields

> "The theory of the electromagnetic field is the most successful physical theory we have. It describes precisely how electromagnetic fields propagate and interact with matter."
>
> — Richard Feynman

```{note}
Vector calculus provides the mathematical language of electromagnetism. While Maxwell's equations can be written in component form, their true elegance and physical meaning emerge when expressed using vector notation. This mathematical framework doesn't just simplify calculations—it reveals the fundamental geometric and topological properties of electromagnetic fields that govern all optical phenomena.
```

Vector calculus forms the mathematical foundation for understanding electromagnetic fields and their propagation through space. Far from being abstract mathematics, these tools provide direct insight into the physical behavior of light, revealing why electromagnetic waves can propagate through vacuum, how energy flows in optical systems, and why certain field configurations are stable while others are not. This appendix will guide you through the essential vector operations, building from basic concepts to Maxwell's equations and their solutions for optical wave propagation.

## D.1 Why Vector Calculus Is Essential for Optics

### D.1.1 The Vector Nature of Electromagnetic Fields

```{note}
:class: tip

**Tip:** Unlike scalar quantities like temperature or pressure, electromagnetic fields have both magnitude and direction at each point in space. This directional information is crucial for understanding polarization, wave propagation, and field interactions.
```

Electromagnetic fields are fundamentally **vector fields**—quantities that have both magnitude and direction at every point in space. The electric field $\vec{E}(\vec{r}, t)$ and magnetic field $\vec{B}(\vec{r}, t)$ specify not just how strong the field is at each location, but also which direction it points.

This vector nature is crucial for optics because:
- **Polarization**: The direction of the electric field vector determines the polarization state
- **Energy flow**: The direction of energy transport is given by the cross product $\vec{E} \times \vec{B}$
- **Wave propagation**: The wave vector indicates the direction of phase velocity
- **Boundary conditions**: Field components parallel and perpendicular to interfaces behave differently

### D.1.2 Local vs. Global Properties

Vector calculus allows us to connect **local** properties (what happens at a point) to **global** properties (what happens over regions or surfaces):

```{list-table} Local-Global Connections
:header-rows: 1
:name: table:localGlobalConnections

* - Local Property
  - Vector Operation
  - Global Property
  - Physical Meaning
* - Field variations
  - Gradient $\nabla f$
  - Potential differences
  - Force on charges
* - Field circulation
  - Curl $\nabla \times \vec{F}$
  - Line integrals
  - Induced electric fields
* - Field divergence
  - Divergence $\nabla \cdot \vec{F}$
  - Surface integrals
  - Source distributions
```

### D.1.3 Maxwell's Equations: The Foundation

Maxwell's equations in their vector form provide a complete description of electromagnetism:

$$\nabla \cdot \vec{E} = \frac{\rho}{\epsilon_0} \quad \text{(Gauss's law)}$$
$$\nabla \cdot \vec{B} = 0 \quad \text{(No magnetic monopoles)}$$
$$\nabla \times \vec{E} = -\frac{\partial \vec{B}}{\partial t} \quad \text{(Faraday's law)}$$
$$\nabla \times \vec{B} = \mu_0 \vec{J} + \mu_0 \epsilon_0 \frac{\partial \vec{E}}{\partial t} \quad \text{(Ampère-Maxwell law)}$$

```{warning}
:class: important

**Important:** These equations connect the spatial derivatives of fields (described by vector calculus operators) to their sources and time evolution. Understanding these operators is essential for solving electromagnetic problems in optics.
```

## D.2 Vector Fields and Coordinate Systems

### D.2.1 Vector Field Representation

A **vector field** assigns a vector to each point in space. In optics, we commonly encounter:

**Electric field**: $\vec{E}(\vec{r}, t) = E_x(x,y,z,t)\hat{x} + E_y(x,y,z,t)\hat{y} + E_z(x,y,z,t)\hat{z}$

**Magnetic field**: $\vec{B}(\vec{r}, t) = B_x(x,y,z,t)\hat{x} + B_y(x,y,z,t)\hat{y} + B_z(x,y,z,t)\hat{z}$

**Poynting vector**: $\vec{S} = \frac{1}{\mu_0}\vec{E} \times \vec{B}$ (energy flow direction)

### D.2.2 Coordinate Systems

**Cartesian coordinates** (x, y, z):
- Best for: Rectangular geometries, plane waves, layered media
- Unit vectors: $\hat{x}, \hat{y}, \hat{z}$ (constant directions)
- Position vector: $\vec{r} = x\hat{x} + y\hat{y} + z\hat{z}$

**Cylindrical coordinates** (ρ, φ, z):
- Best for: Optical fibers, cylindrical lenses, beam propagation
- Unit vectors: $\hat{\rho}, \hat{\phi}, \hat{z}$ (note: $\hat{\rho}$ and $\hat{\phi}$ change direction!)
- Position vector: $\vec{r} = \rho\hat{\rho} + z\hat{z}$

**Spherical coordinates** (r, θ, φ):
- Best for: Point sources, spherical mirrors, far-field patterns
- Unit vectors: $\hat{r}, \hat{\theta}, \hat{\phi}$ (all change direction!)
- Position vector: $\vec{r} = r\hat{r}$

```{note} Example: Plane Wave in Different Coordinates
A plane wave traveling in the z-direction:

**Cartesian**: $\vec{E} = E_0 \cos(kz - \omega t)\hat{x}$
**Cylindrical**: $\vec{E} = E_0 \cos(kz - \omega t)\hat{x}$ (same, since the wave is independent of ρ and φ)
**Spherical**: More complex due to coordinate transformation, but reduces to Cartesian form for $r \gg \lambda$
```

### D.2.3 Coordinate Transformations

When changing coordinate systems, both vector components and unit vectors transform:

**Cartesian to cylindrical**:
$$\hat{x} = \cos\phi \hat{\rho} - \sin\phi \hat{\phi}$$
$$\hat{y} = \sin\phi \hat{\rho} + \cos\phi \hat{\phi}$$
$$\hat{z} = \hat{z}$$

**Physical significance**: A linearly polarized wave that's purely x-polarized in Cartesian coordinates has both ρ and φ components in cylindrical coordinates that vary with azimuthal angle φ.

## D.3 The Gradient: Measuring Field Variations

### D.3.1 Definition and Physical Meaning

The **gradient** of a scalar field $f(\vec{r})$ is:

$$\nabla f = \frac{\partial f}{\partial x}\hat{x} + \frac{\partial f}{\partial y}\hat{y} + \frac{\partial f}{\partial z}\hat{z}$$

```{warning}
:class: important

**Important:** **Physical Interpretation**: The gradient points in the direction of steepest increase of the function and has magnitude equal to the rate of increase in that direction.
```

### D.3.2 Gradient in Different Coordinate Systems

**Cartesian**:
$$\nabla f = \frac{\partial f}{\partial x}\hat{x} + \frac{\partial f}{\partial y}\hat{y} + \frac{\partial f}{\partial z}\hat{z}$$

**Cylindrical**:
$$\nabla f = \frac{\partial f}{\partial \rho}\hat{\rho} + \frac{1}{\rho}\frac{\partial f}{\partial \phi}\hat{\phi} + \frac{\partial f}{\partial z}\hat{z}$$

**Spherical**:
$$\nabla f = \frac{\partial f}{\partial r}\hat{r} + \frac{1}{r}\frac{\partial f}{\partial \theta}\hat{\theta} + \frac{1}{r\sin\theta}\frac{\partial f}{\partial \phi}\hat{\phi}$$

### D.3.3 Applications in Optics

**Electric potential**: If the electric field derives from a potential, $\vec{E} = -\nabla V$

```{note} Example: Spherical Wave Potential
For a point source at the origin:
$$V(r) = \frac{A}{r}e^{i(kr - \omega t)}$$

The electric field is:
$$\vec{E} = -\nabla V = -\frac{\partial V}{\partial r}\hat{r} = \frac{A}{r^2}(1 + ikr)e^{i(kr - \omega t)}\hat{r}$$

This shows both near-field ($1/r^2$) and far-field ($ik/r$) components.
```

**Refractive index gradients**: In graded-index media, $\nabla n$ determines ray bending:
$$\frac{d}{ds}\left(n\frac{d\vec{r}}{ds}\right) = \nabla n$$

**Phase gradients**: The wave vector is the gradient of the phase:
$$\vec{k} = \nabla \phi$$

## D.4 The Divergence: Measuring Sources and Sinks

### D.4.1 Definition and Physical Meaning

The **divergence** of a vector field $\vec{F}(\vec{r})$ is:

$$\nabla \cdot \vec{F} = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y} + \frac{\partial F_z}{\partial z}$$

```{warning}
:class: important

**Important:** **Physical Interpretation**: Divergence measures the "outflow" of the vector field from a point. Positive divergence indicates a source, negative divergence indicates a sink, and zero divergence indicates incompressible flow.
```

### D.4.2 Divergence in Different Coordinate Systems

**Cartesian**:
$$\nabla \cdot \vec{F} = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y} + \frac{\partial F_z}{\partial z}$$

**Cylindrical**:
$$\nabla \cdot \vec{F} = \frac{1}{\rho}\frac{\partial(\rho F_\rho)}{\partial \rho} + \frac{1}{\rho}\frac{\partial F_\phi}{\partial \phi} + \frac{\partial F_z}{\partial z}$$

**Spherical**:
$$\nabla \cdot \vec{F} = \frac{1}{r^2}\frac{\partial(r^2 F_r)}{\partial r} + \frac{1}{r\sin\theta}\frac{\partial(\sin\theta F_\theta)}{\partial \theta} + \frac{1}{r\sin\theta}\frac{\partial F_\phi}{\partial \phi}$$

### D.4.3 Gauss's Divergence Theorem

The divergence theorem connects local divergence to global flux:

$$\int_V (\nabla \cdot \vec{F}) dV = \oint_S \vec{F} \cdot d\vec{A}$$

```{note}
**Physical meaning**: The total outflow through a closed surface equals the sum of all sources minus sinks inside the volume.
```

### D.4.4 Applications in Optics

**Gauss's law for electricity**:
$$\nabla \cdot \vec{E} = \frac{\rho}{\epsilon_0}$$

This tells us that electric field lines originate from positive charges and terminate on negative charges.

**No magnetic monopoles**:
$$\nabla \cdot \vec{B} = 0$$

Magnetic field lines always form closed loops—they have no beginning or end.

```{note} Example: Spherical Wave Divergence
For a spherical wave $\vec{E} = \frac{A}{r}e^{i(kr - \omega t)}\hat{r}$:

$$\nabla \cdot \vec{E} = \frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2 \frac{A}{r}e^{i(kr - \omega t)}\right) = \frac{A}{r^2}\frac{\partial}{\partial r}(re^{i(kr - \omega t)})$$

$$= \frac{A}{r^2}(1 + ikr)e^{i(kr - \omega t)}$$

This is non-zero due to the point source at the origin. For a plane wave (no sources), the divergence would be exactly zero.
```

## D.5 The Curl: Measuring Rotation and Circulation

### D.5.1 Definition and Physical Meaning

The **curl** of a vector field $\vec{F}(\vec{r})$ is:

$$\nabla \times \vec{F} = \begin{vmatrix} \hat{x} & \hat{y} & \hat{z} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ F_x & F_y & F_z \end{vmatrix}$$

$$= \left(\frac{\partial F_z}{\partial y} - \frac{\partial F_y}{\partial z}\right)\hat{x} + \left(\frac{\partial F_x}{\partial z} - \frac{\partial F_z}{\partial x}\right)\hat{y} + \left(\frac{\partial F_y}{\partial x} - \frac{\partial F_x}{\partial y}\right)\hat{z}$$

```{warning}
:class: important

**Important:** **Physical Interpretation**: Curl measures the local rotation or "twist" of the vector field. The direction of the curl vector follows the right-hand rule for the axis of rotation.
```

### D.5.2 Curl in Different Coordinate Systems

**Cylindrical**:
$$\nabla \times \vec{F} = \left(\frac{1}{\rho}\frac{\partial F_z}{\partial \phi} - \frac{\partial F_\phi}{\partial z}\right)\hat{\rho} + \left(\frac{\partial F_\rho}{\partial z} - \frac{\partial F_z}{\partial \rho}\right)\hat{\phi} + \frac{1}{\rho}\left(\frac{\partial(\rho F_\phi)}{\partial \rho} - \frac{\partial F_\rho}{\partial \phi}\right)\hat{z}$$

**Spherical**:
$$\nabla \times \vec{F} = \frac{1}{r\sin\theta}\left(\frac{\partial(\sin\theta F_\phi)}{\partial \theta} - \frac{\partial F_\theta}{\partial \phi}\right)\hat{r} + \frac{1}{r}\left(\frac{1}{\sin\theta}\frac{\partial F_r}{\partial \phi} - \frac{\partial(rF_\phi)}{\partial r}\right)\hat{\theta} + \frac{1}{r}\left(\frac{\partial(rF_\theta)}{\partial r} - \frac{\partial F_r}{\partial \theta}\right)\hat{\phi}$$

### D.5.3 Stokes' Theorem

Stokes' theorem connects local curl to circulation around a closed path:

$$\int_S (\nabla \times \vec{F}) \cdot d\vec{A} = \oint_C \vec{F} \cdot d\vec{l}$$

```{note}
**Physical meaning**: The circulation of a vector field around a closed loop equals the total curl threading the surface bounded by that loop.
```

### D.5.4 Applications in Optics

**Faraday's law**:
$$\nabla \times \vec{E} = -\frac{\partial \vec{B}}{\partial t}$$

A time-varying magnetic field creates circulating electric fields (the principle behind transformers and betatrons).

**Ampère-Maxwell law**:
$$\nabla \times \vec{B} = \mu_0 \vec{J} + \mu_0 \epsilon_0 \frac{\partial \vec{E}}{\partial t}$$

Current and time-varying electric fields create circulating magnetic fields.

```{note} Example: Circularly Polarized Wave
For a circularly polarized wave $\vec{E} = E_0(\hat{x} + i\hat{y})e^{i(kz - \omega t)}$:

$$\nabla \times \vec{E} = \frac{\partial E_y}{\partial z}\hat{x} - \frac{\partial E_x}{\partial z}\hat{y} = ik E_0(-i\hat{x} + \hat{y})e^{i(kz - \omega t)} = ikE_0(-\hat{y} - i\hat{x})e^{i(kz - \omega t)}$$

From Faraday's law:
$$\vec{B} = -\frac{1}{i\omega}\nabla \times \vec{E} = \frac{k}{\omega}E_0(-\hat{y} - i\hat{x})e^{i(kz - \omega t)} = \frac{E_0}{c}(-\hat{y} - i\hat{x})e^{i(kz - \omega t)}$$

The magnetic field is perpendicular to the electric field and rotates with it, maintaining circular polarization.
```

## D.6 The Laplacian: Wave Equations and Diffusion

### D.6.1 Definition

The **Laplacian** is the divergence of the gradient:

$$\nabla^2 f = \nabla \cdot (\nabla f) = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2} + \frac{\partial^2 f}{\partial z^2}$$

For vector fields, the Laplacian operates on each component:
$$\nabla^2 \vec{F} = (\nabla^2 F_x)\hat{x} + (\nabla^2 F_y)\hat{y} + (\nabla^2 F_z)\hat{z}$$

### D.6.2 Laplacian in Different Coordinate Systems

**Cartesian**:
$$\nabla^2 f = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2} + \frac{\partial^2 f}{\partial z^2}$$

**Cylindrical**:
$$\nabla^2 f = \frac{1}{\rho}\frac{\partial}{\partial \rho}\left(\rho\frac{\partial f}{\partial \rho}\right) + \frac{1}{\rho^2}\frac{\partial^2 f}{\partial \phi^2} + \frac{\partial^2 f}{\partial z^2}$$

**Spherical**:
$$\nabla^2 f = \frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial f}{\partial r}\right) + \frac{1}{r^2\sin\theta}\frac{\partial}{\partial \theta}\left(\sin\theta\frac{\partial f}{\partial \theta}\right) + \frac{1}{r^2\sin^2\theta}\frac{\partial^2 f}{\partial \phi^2}$$

### D.6.3 Applications in Optics

**Wave equation**: In free space, electromagnetic fields satisfy:
$$\nabla^2 \vec{E} - \mu_0 \epsilon_0 \frac{\partial^2 \vec{E}}{\partial t^2} = 0$$
$$\nabla^2 \vec{B} - \mu_0 \epsilon_0 \frac{\partial^2 \vec{B}}{\partial t^2} = 0$$

**Helmholtz equation**: For monochromatic waves, $\vec{E}(\vec{r},t) = \vec{E}(\vec{r})e^{-i\omega t}$:
$$\nabla^2 \vec{E} + k^2 \vec{E} = 0$$
where $k = \omega\sqrt{\mu_0\epsilon_0} = \omega/c$.

```{note} Example: Gaussian Beam Solution
The Gaussian beam is a solution to the paraxial wave equation (an approximation to the Helmholtz equation):

$$\vec{E}(x,y,z) = E_0 \frac{w_0}{w(z)} \exp\left(-\frac{x^2 + y^2}{w^2(z)}\right) \exp\left(ikz - ik\frac{x^2 + y^2}{2R(z)} + i\zeta(z)\right)$$

where:
- $w(z) = w_0\sqrt{1 + (z/z_R)^2}$ is the beam waist
- $R(z) = z[1 + (z_R/z)^2]$ is the radius of curvature
- $z_R = \pi w_0^2/\lambda$ is the Rayleigh range
- $\zeta(z) = \arctan(z/z_R)$ is the Gouy phase

This solution satisfies the paraxial Helmholtz equation and represents the fundamental mode of laser cavities.
```

## D.7 Vector Identities and Relationships

### D.7.1 Fundamental Vector Identities

These identities are essential for manipulating Maxwell's equations:

```{list-table} Essential Vector Identities
:header-rows: 1
:name: table:vectorIdentities

* - Identity
  - Mathematical Form
  - Physical Significance
* - **Divergence of curl**
  - $\nabla \cdot (\nabla \times \vec{F}) = 0$
  - Magnetic field has no divergence
* - **Curl of gradient**
  - $\nabla \times (\nabla f) = 0$
  - Conservative fields
* - **Vector Laplacian**
  - $\nabla^2 \vec{F} = \nabla(\nabla \cdot \vec{F}) - \nabla \times (\nabla \times \vec{F})$
  - Separates longitudinal and transverse parts
* - **Product rules**
  - $\nabla \cdot (f\vec{F}) = f(\nabla \cdot \vec{F}) + \vec{F} \cdot (\nabla f)$
  - Field interactions with media
```

### D.7.2 Maxwell's Equations in Vector Form

Taking the curl of Faraday's law:
$$\nabla \times (\nabla \times \vec{E}) = -\nabla \times \frac{\partial \vec{B}}{\partial t} = -\frac{\partial}{\partial t}(\nabla \times \vec{B})$$

Substituting Ampère's law (in vacuum, $\vec{J} = 0$):
$$\nabla \times (\nabla \times \vec{E}) = -\mu_0 \epsilon_0 \frac{\partial^2 \vec{E}}{\partial t^2}$$

Using the vector identity:
$$\nabla(\nabla \cdot \vec{E}) - \nabla^2 \vec{E} = -\mu_0 \epsilon_0 \frac{\partial^2 \vec{E}}{\partial t^2}$$

In charge-free regions, $\nabla \cdot \vec{E} = 0$, giving the **wave equation**:
$$\nabla^2 \vec{E} = \mu_0 \epsilon_0 \frac{\partial^2 \vec{E}}{\partial t^2}$$

### D.7.3 Boundary Conditions

At interfaces between different media, Maxwell's equations impose boundary conditions:

**Tangential electric field**: $\hat{n} \times (\vec{E}_2 - \vec{E}_1) = 0$
**Normal electric displacement**: $\hat{n} \cdot (\vec{D}_2 - \vec{D}_1) = \sigma_f$
**Tangential magnetic field**: $\hat{n} \times (\vec{B}_2 - \vec{B}_1) = \mu_0 \vec{K}_f$
**Normal magnetic field**: $\hat{n} \cdot (\vec{B}_2 - \vec{B}_1) = 0$

where $\sigma_f$ is free surface charge density and $\vec{K}_f$ is free surface current density.

## D.8 Applications to Wave Propagation

### D.8.1 Plane Wave Solutions

For a plane wave $\vec{E} = \vec{E}_0 e^{i(\vec{k} \cdot \vec{r} - \omega t)}$:

**Divergence**: $\nabla \cdot \vec{E} = i\vec{k} \cdot \vec{E} = 0$
This shows that electromagnetic waves are **transverse**: $\vec{k} \perp \vec{E}$

**Curl**: $\nabla \times \vec{E} = i\vec{k} \times \vec{E}$
From Faraday's law: $i\vec{k} \times \vec{E} = i\omega \vec{B}$
Therefore: $\vec{B} = \frac{\vec{k} \times \vec{E}}{\omega} = \frac{\vec{k} \times \vec{E}}{c|\vec{k}|}$

**Key results**:
- $\vec{E} \perp \vec{B}$ (fields are perpendicular)
- $\vec{E} \perp \vec{k}$ and $\vec{B} \perp \vec{k}$ (transverse waves)
- $|\vec{B}| = |\vec{E}|/c$ (field magnitude relationship)
- $\vec{k}, \vec{E}, \vec{B}$ form a right-handed coordinate system

### D.8.2 Energy and Momentum

**Poynting vector** (energy flow):
$$\vec{S} = \frac{1}{\mu_0}\vec{E} \times \vec{B}$$

For a plane wave: $|\vec{S}| = \frac{|\vec{E}|^2}{\mu_0 c} = \frac{|\vec{E}|^2}{Z_0}$

where $Z_0 = \sqrt{\mu_0/\epsilon_0} = 377\,\Omega$ is the impedance of free space.

**Electromagnetic momentum density**:
$$\vec{g} = \epsilon_0 \vec{E} \times \vec{B} = \frac{\vec{S}}{c^2}$$

### D.8.3 Spherical Waves

For spherical waves emanating from a point source:
$$\vec{E}(r,\theta,\phi) = \frac{f(\theta,\phi)}{r} e^{i(kr - \omega t)} \hat{\theta} + \frac{g(\theta,\phi)}{r} e^{i(kr - \omega t)} \hat{\phi}$$

The radial component vanishes in the far field due to the transversality condition $\nabla \cdot \vec{E} = 0$.

```{note} Example: Electric Dipole Radiation
An oscillating electric dipole $\vec{p}(t) = p_0 \cos(\omega t)\hat{z}$ produces:

$$\vec{E}(r,\theta,t) = \frac{\mu_0 \omega^2 p_0 \sin\theta}{4\pi r} \cos(\omega t - kr + \phi) \hat{\theta}$$

$$\vec{B}(r,\theta,t) = \frac{\mu_0 \omega^2 p_0 \sin\theta}{4\pi c r} \cos(\omega t - kr + \phi) \hat{\phi}$$

The radiated power pattern is: $P(\theta) \propto \sin^2\theta$

This shows why dipole antennas have directional radiation patterns and why Rayleigh scattering depends on $\sin^2\theta$.
```

## D.9 Applications to Guided Waves

### D.9.1 Cylindrical Waveguides

For waves propagating in the z-direction with cylindrical symmetry, we separate variables:
$$\vec{E}(\rho,\phi,z,t) = \vec{E}(\rho,\phi) e^{i(\beta z - \omega t)}$$

The wave equation in cylindrical coordinates becomes:
$$\frac{1}{\rho}\frac{\partial}{\partial \rho}\left(\rho\frac{\partial E_z}{\partial \rho}\right) + \frac{1}{\rho^2}\frac{\partial^2 E_z}{\partial \phi^2} + \gamma^2 E_z = 0$$

where $\gamma^2 = k^2 - \beta^2$ and $\beta$ is the propagation constant.

**Solutions**: Bessel functions for the radial dependence, sinusoidal functions for the azimuthal dependence.

### D.9.2 Optical Fibers

In step-index optical fibers, we have:
- **Core**: $n_1$ (higher index)
- **Cladding**: $n_2 < n_1$ (lower index)

**Weakly guiding approximation**: $n_1 - n_2 \ll n_1$

The fundamental mode (LP₀₁) has an approximately Gaussian transverse profile:
$$E(\rho) \propto e^{-\rho^2/w^2}$$

where $w$ is the mode field radius, related to the V-parameter:
$$V = \frac{2\pi a}{\lambda}\sqrt{n_1^2 - n_2^2}$$

**Single-mode condition**: $V < 2.405$ (cutoff for first higher-order mode)

### D.9.3 Slab Waveguides

For a symmetric slab waveguide (thickness $2a$, core index $n_1$, cladding index $n_2$):

**TE modes** ($E_z = 0$):
$$\tan(ka) = \frac{\gamma}{k} \quad \text{(symmetric modes)}$$
$$\cot(ka) = -\frac{\gamma}{k} \quad \text{(antisymmetric modes)}$$

where $k^2 = \omega^2 n_1^2/c^2 - \beta^2$ and $\gamma^2 = \beta^2 - \omega^2 n_2^2/c^2$.

## D.10 Advanced Applications

### D.10.1 Metamaterials and Effective Medium Theory

For subwavelength structures, we can define effective permittivity and permeability tensors:

$$\vec{D} = \overleftrightarrow{\epsilon} \cdot \vec{E}, \quad \vec{B} = \overleftrightarrow{\mu} \cdot \vec{H}$$

**Wire arrays**: Effective plasma frequency
$$\omega_p^2 = \frac{2\pi c^2}{a^2 \ln(a/r)}$$

**Split-ring resonators**: Magnetic resonance at
$$\omega_m = \frac{1}{\sqrt{LC}}$$

### D.10.2 Nonlinear Optics

In nonlinear media, the polarization depends nonlinearly on the field:
$$\vec{P} = \epsilon_0 \chi^{(1)} \vec{E} + \epsilon_0 \chi^{(2)} \vec{E}\vec{E} + \epsilon_0 \chi^{(3)} \vec{E}\vec{E}\vec{E} + \cdots$$

This leads to coupled wave equations:
$$\nabla^2 \vec{E} - \mu_0 \epsilon_0 \frac{\partial^2 \vec{E}}{\partial t^2} = \mu_0 \frac{\partial^2 \vec{P}_{NL}}{\partial t^2}$$

### D.10.3 Quantum Optics

The electromagnetic field operators satisfy commutation relations:
$$[\hat{E}_i(\vec{r}), \hat{E}_j(\vec{r}')] = 0$$
$$[\hat{E}_i(\vec{r}), \hat{B}_j(\vec{r}')] = i\hbar c \epsilon_{ijk} \nabla_k \delta^3(\vec{r} - \vec{r}')$$

These lead to uncertainty principles and quantum effects like photon antibunching and squeezed light.

## D.11 Computational Methods

### D.11.1 Finite Difference Methods

Discretize Maxwell's equations on a grid:
$$\frac{\partial E_x}{\partial t} = \frac{1}{\epsilon}\left(\frac{H_z(y+\Delta y) - H_z(y)}{\Delta y} - \frac{H_y(z+\Delta z) - H_y(z)}{\Delta z}\right)$$

**Yee algorithm**: Stagger electric and magnetic field components in space and time for stability.

### D.11.2 Finite Element Methods

Expand fields in basis functions:
$$\vec{E}(\vec{r}) = \sum_i E_i \vec{N}_i(\vec{r})$$

Substitute into wave equation and apply Galerkin method to obtain matrix equation:
$$[K]\{E\} = \omega^2[M]\{E\}$$

### D.11.3 Method of Moments

For scattering problems, solve the integral equation:
$$\vec{E}^{inc}(\vec{r}) = -\int \overleftrightarrow{G}(\vec{r},\vec{r}') \cdot \vec{J}(\vec{r}') d^3r'$$

where $\overleftrightarrow{G}$ is the dyadic Green's function.

## D.12 Summary and Physical Insights

### D.12.1 Fundamental Principles

Vector calculus reveals the deep structure of electromagnetism:

```{list-table} Core Physical Insights
:header-rows: 1
:name: table:physicalInsights

* - Vector Operation
  - Maxwell Equation
  - Physical Principle
* - **Divergence**
  - $\nabla \cdot \vec{E} = \rho/\epsilon_0$
  - Electric charges are sources of field
* - **Curl**
  - $\nabla \times \vec{E} = -\partial\vec{B}/\partial t$
  - Changing magnetic field induces electric field
* - **Wave equation**
  - $\nabla^2 \vec{E} = \mu_0\epsilon_0 \partial^2\vec{E}/\partial t^2$
  - Fields propagate as waves
* - **Transversality**
  - $\vec{k} \cdot \vec{E} = 0$
  - EM waves are transverse
```

### D.12.2 Symmetries and Conservation Laws

**Gauge invariance**: Physics is unchanged by gauge transformations
$$\vec{A} \rightarrow \vec{A} + \nabla \Lambda, \quad \phi \rightarrow \phi - \frac{\partial \Lambda}{\partial t}$$

**Energy conservation**: From Poynting's theorem
$$\frac{\partial u}{\partial t} + \nabla \cdot \vec{S} = -\vec{J} \cdot \vec{E}$$

**Momentum conservation**: Electromagnetic momentum density $\vec{g} = \epsilon_0 \vec{E} \times \vec{B}$

### D.12.3 Connection to Other Physics

**Relativity**: Maxwell's equations are Lorentz covariant—they have the same form in all inertial frames.

**Quantum mechanics**: The vector potential appears in the covariant derivative and leads to the Aharonov-Bohm effect.

**Condensed matter**: Effective medium theories use vector calculus to relate microscopic and macroscopic properties.

## D.13 Worked Examples

### D.13.1 Rectangular Waveguide Analysis

```{note} Problem: TE₁₀ Mode in Rectangular Waveguide
Find the field components for the TE₁₀ mode in a rectangular waveguide with dimensions $a \times b$.

**Solution:**

For TE modes, $E_z = 0$ and we solve for $H_z$.

**Boundary conditions**: $E_x = E_y = 0$ at conducting walls.

**Ansatz**: $H_z(x,y) = H_0 \cos\left(\frac{\pi x}{a}\right) e^{i(\beta z - \omega t)}$

**From Maxwell's equations**:
$$E_x = \frac{i\beta}{\gamma^2} \frac{\partial H_z}{\partial y} = 0$$
$$E_y = -\frac{i\beta}{\gamma^2} \frac{\partial H_z}{\partial x} = \frac{i\beta \pi H_0}{\gamma^2 a} \sin\left(\frac{\pi x}{a}\right) e^{i(\beta z - \omega t)}$$

**Dispersion relation**: $\gamma^2 = (\pi/a)^2$, so
$$\beta^2 = \frac{\omega^2}{c^2} - \frac{\pi^2}{a^2}$$

**Cutoff frequency**: $\omega_c = \pi c/a$

For $\omega > \omega_c$, the mode propagates. For $\omega < \omega_c$, the mode is evanescent.
```

### D.13.2 Electromagnetic Wave Scattering

```{note} Problem: Plane Wave Scattering by a Sphere
Analyze the scattering of a plane wave by a dielectric sphere using vector spherical harmonics.

**Solution:**

**Incident wave**: $\vec{E}^{inc} = E_0 e^{ikz} \hat{x}$

**Expand in spherical harmonics**: The incident, scattered, and internal fields are expanded as:
$$\vec{E} = \sum_{l,m} [a_{lm} \vec{M}_{lm}^{(1)} + b_{lm} \vec{N}_{lm}^{(1)}]$$

where $\vec{M}$ and $\vec{N}$ are vector spherical harmonics.

**Boundary conditions**: At $r = R$ (sphere surface):
- Tangential electric field continuous
- Tangential magnetic field continuous

**Mie coefficients**: These conditions determine the expansion coefficients $a_l$ and $b_l$.

**Scattering cross-section**:
$$\sigma_{scat} = \frac{2\pi}{k^2} \sum_{l=1}^{\infty} (2l+1)(|a_l|^2 + |b_l|^2)$$

**Rayleigh limit** ($kR \ll 1$): $\sigma_{scat} \propto (kR)^4 \propto \lambda^{-4}$ (why the sky is blue)
```

### D.13.3 Gaussian Beam Propagation

```{note} Problem: Gaussian Beam Through a Lens
A Gaussian beam with waist $w_0$ is focused by a lens of focal length $f$. Find the new waist size and location.

**Solution:**

**ABCD matrix for lens**: $\begin{pmatrix} 1 & 0 \\ -1/f & 1 \end{pmatrix}$

**Gaussian beam parameter**: $q = z + iz_R$ where $z_R = \pi w_0^2/\lambda$

**Transformation rule**: $q_{out} = \frac{Aq_{in} + B}{Cq_{in} + D}$

**For a thin lens**: $q_{out} = \frac{q_{in}}{-q_{in}/f + 1}$

**If the beam waist is at the lens** ($z = 0$, so $q_{in} = iz_R$):
$$q_{out} = \frac{iz_R}{-iz_R/f + 1} = \frac{iz_R f}{f - iz_R}$$

**Output waist location**: $z_{out} = \text{Re}(q_{out}) = \frac{z_R^2 f}{f^2 + z_R^2}$

**Output waist size**: $w_{out} = w_0 \frac{f}{\sqrt{f^2 + z_R^2}}$

**Minimum waist** occurs when $f = z_R$: $w_{min} = w_0/\sqrt{2}$
```

## D.14 Practice Problems

### D.14.1 Vector Operations

```{note} Problem D.1
:class: exercise

Calculate the following for the vector field $\vec{F} = x^2 y \hat{x} + y^2 z \hat{y} + z^2 x \hat{z}$:
a) $\nabla \cdot \vec{F}$
b) $\nabla \times \vec{F}$
c) $\nabla^2 \vec{F}$
d) Is this field conservative? Why or why not?
```

### D.14.2 Electromagnetic Waves

```{note} Problem D.2
:class: exercise

A plane electromagnetic wave has an electric field $\vec{E} = E_0(\hat{x} + i\hat{y})e^{i(kz - \omega t)}$.
a) Find the magnetic field $\vec{B}$
b) Calculate the Poynting vector $\vec{S}$
c) What type of polarization is this?
d) Calculate the time-averaged energy density
```

### D.14.3 Waveguide Modes

```{note} Problem D.3
:class: exercise

For a step-index optical fiber with core radius $a = 5$ μm, core index $n_1 = 1.46$, and cladding index $n_2 = 1.45$:
a) Calculate the V-parameter at λ = 1550 nm
b) How many modes can propagate?
c) Find the mode field radius for the fundamental mode
d) What happens if the wavelength is changed to 800 nm?
```

### D.14.4 Boundary Conditions

```{note} Problem D.4
:class: exercise

Light travels from air (n₁ = 1) into glass (n₂ = 1.5) at 45° incidence:
a) Apply boundary conditions to find reflection and transmission coefficients
b) Calculate the phase change upon reflection for s and p polarizations
c) Find the Brewster angle for this interface
d) What happens to the Poynting vector at the interface?
```

## D.15 Final Thoughts: The Mathematical Beauty of Electromagnetism

Vector calculus provides more than computational tools—it reveals the geometric and topological structure underlying electromagnetic phenomena. The elegance of Maxwell's equations in vector form reflects deep symmetries in space and time that govern how information and energy propagate through the universe.

> "Maxwell's equations are the most beautiful equations in physics. They connect electricity, magnetism, and light in a unified theory that has stood unchanged for over 150 years."
>
> — Freeman Dyson

The mathematical framework we've explored connects to fundamental concepts throughout physics:

- **Gauge theory**: The vector potential and gauge transformations appear in particle physics
- **Relativity**: Maxwell's equations are the same in all inertial frames
- **Quantum field theory**: Electromagnetic fields become quantum operators
- **Topology**: Field configurations can have topological properties (monopoles, skyrmions)

```{note}
**Developing Vector Intuition**: The key to mastering vector calculus in optics is developing geometric intuition:
- **Gradient**: Points "uphill," perpendicular to level surfaces
- **Divergence**: Measures "spreading out" from a point
- **Curl**: Measures "twisting" around an axis
- **Laplacian**: Measures how much a point differs from its neighbors

Practice visualizing these operations geometrically, and the mathematical formalism will become a natural language for describing electromagnetic phenomena.
```

As you continue studying optics, remember that every optical phenomenon—from simple refraction to complex laser dynamics—emerges from the vector calculus operations we've explored. Master these mathematical tools, and you'll have the foundation for understanding how light behaves in any situation, from the cosmic to the quantum scale.

```{note}
:class: tip

**Tip:** **Connecting Mathematics to Physics**: Always ask these questions when working with vector calculus:
- What does this gradient represent physically?
- Why is the divergence zero (or non-zero) here?
- What physical process creates this curl?
- How do boundary conditions reflect the underlying physics?

The mathematics is not separate from the physics—it *is* the physics, expressed in its most precise and universal form.
```

Vector calculus stands as one of the greatest achievements in mathematical physics, providing a unified language for describing electromagnetic phenomena across all scales and applications. Master these concepts, and you'll have one of the most powerful tools in all of science at your command.