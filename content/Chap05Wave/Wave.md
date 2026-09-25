---
tags:
  - wave-optics
  - electromagnetic-theory
  - intermediate
  - theory
downloads:
  - id: chapter-05-pdf
    title: Download Chapter PDF
  - id: chapter-05-docx
    title: Download Chapter DOCX
---

(chapter:wave)=
# Wave Equations

```{note} What you should know and be able to do after studying this chapter
- Derive and understand the one-dimensional wave equation and verify that functions of the form $f(x \pm vt)$ are solutions.
- Describe harmonic waves using wavelength $\lambda$, frequency $\nu$, angular frequency $\omega$, wave number $k$, and phase velocity $v$.
- Understand the relationships between wave parameters: $v = \lambda\nu$, $k = 2\pi/\lambda$, $\omega = 2\pi\nu$.
- Use complex number representation and Euler's formula to simplify wave calculations.
- Express harmonic waves in complex exponential form $\tilde{y} = Ae^{i(kx-\omega t)}$ and extract physical quantities.
- Understand plane waves and the propagation vector $\vec{k}$, including the dot product form $\psi = A\sin(\vec{k} \cdot \vec{r} - \omega t)$.
- Describe spherical waves and explain the $1/r$ amplitude dependence and the inverse square law for intensity.
- Know the properties of electromagnetic waves: transverse nature, speed $c = 1/\sqrt{\varepsilon_0\mu_0}$, and the relationship $E_0 = cB_0$.
- Calculate energy density, Poynting vector, and irradiance for electromagnetic waves.
- Understand polarization states: linear, circular, and elliptical polarization.
- Apply the Doppler effect formula for electromagnetic waves and calculate frequency/wavelength shifts.
```

## Introduction

Wave phenomena are fundamental to understanding many aspects of physics, from mechanical vibrations to electromagnetic radiation. This chapter develops the mathematical framework necessary to describe wave motion in general, with particular emphasis on harmonic waves as the most practically useful special case. The harmonic wave functions we will derive serve as the foundation for understanding electromagnetic waves and light waves, which are central to optics and modern physics.

The mathematical expressions developed in this chapter enable us to quantitatively describe how waves propagate through space and time. When combined with results from electromagnetic theory, these wave equations allow us to determine the energy carried and delivered by waves, making them essential tools for analyzing everything from radio communications to laser systems.

## One-Dimensional Wave Equation

### Wave Pulse Description

To understand wave motion mathematically, we begin by considering a simple one-dimensional wave pulse. Imagine a disturbance with an arbitrary shape described by the function $y' = f(x')$ in a coordinate system that moves along with the wave. This moving coordinate system allows us to describe the wave's shape independent of its motion.

Now consider a fixed coordinate system O(x,y) in which we observe this wave pulse moving to the right with uniform speed $v$. The relationship between the moving coordinate $x'$ and the fixed coordinate $x$ depends on the direction of wave propagation. For a wave moving to the right (positive x-direction), we have:

$$x' = x - vt$$

For a wave moving to the left (negative x-direction), the relationship becomes:

$$x' = x + vt$$

This coordinate transformation is the key to understanding how waves maintain their shape while propagating. The wave function in the fixed coordinate system becomes:

$$y(x,t) = f(x \pm vt)$$

where the choice of sign determines the direction of propagation. The minus sign corresponds to rightward motion, while the plus sign indicates leftward motion.

### Mathematical Derivation

To derive the fundamental wave equation, we need to examine how the wave function behaves under partial differentiation with respect to both position and time. Using the chain rule for partial derivatives, we can express the spatial derivatives of the wave function.

For the first spatial derivative:
$$\frac{\partial y}{\partial x} = \frac{\partial f}{\partial x'} \frac{\partial x'}{\partial x} = \frac{\partial f}{\partial x'}$$

since $\frac{\partial x'}{\partial x} = 1$ for both directions of propagation.

The second spatial derivative becomes:
$$\frac{\partial^2 y}{\partial x^2} = \frac{\partial}{\partial x}\left(\frac{\partial f}{\partial x'}\right) = \frac{\partial^2 f}{\partial x'^2} \frac{\partial x'}{\partial x} = \frac{\partial^2 f}{\partial x'^2}$$

For the temporal derivatives, we must account for the sign in the coordinate transformation:
$$\frac{\partial y}{\partial t} = \frac{\partial f}{\partial x'} \frac{\partial x'}{\partial t} = \pm v \frac{\partial f}{\partial x'}$$

where $\frac{\partial x'}{\partial t} = ∓ v$ (minus for rightward motion, plus for leftward motion).

The second temporal derivative is:
$$\frac{\partial^2 y}{\partial t^2} = \pm v \frac{\partial}{\partial t}\left(\frac{\partial f}{\partial x'}\right) = \pm v \frac{\partial^2 f}{\partial x'^2} \frac{\partial x'}{\partial t} = v^2 \frac{\partial^2 f}{\partial x'^2}$$

### The One-Dimensional Wave Equation

Combining our results for the second spatial and temporal derivatives, we obtain the fundamental relationship:

$$\frac{\partial^2 y}{\partial x^2} = \frac{1}{v^2} \frac{\partial^2 y}{\partial t^2}$$

This is the one-dimensional wave equation, one of the most important differential equations in physics. It describes the propagation of any disturbance that maintains its shape while traveling at constant speed $v$.

The remarkable feature of this equation is its generality. Any function of the form $f(x \pm vt)$ satisfies this differential equation, regardless of the specific physical nature of the disturbance. Whether we're describing waves on a string, sound waves in air, or electromagnetic waves in vacuum, the mathematical form remains the same.

To verify whether a given function represents a traveling wave, we simply check if it satisfies the wave equation. If it does, and if it can be written in the form $f(x \pm vt)$, then it represents a wave propagating at speed $v$ in the direction determined by the sign of the argument.

This wave equation forms the foundation for understanding all wave phenomena and will be extended to three dimensions later in this chapter. The speed $v$ appearing in the equation is determined by the physical properties of the medium through which the wave propagates, or by fundamental constants in the case of electromagnetic waves in vacuum.

## Harmonic Waves

### Basic Harmonic Wave Form

While the general wave equation applies to disturbances of any shape, the most practically important and mathematically tractable case involves harmonic waves. These waves use sine or cosine functions and can be written in the form:

$$y = A \sin[k(x \pm vt)] \quad \text{or} \quad y = A \cos[k(x \pm vt)]$$

where $A$ and $k$ are constants that can be varied without changing the fundamental harmonic character of the wave. The constant $A$ represents the amplitude of the wave, while $k$ is called the propagation constant or wave number.

Harmonic waves represent periodic patterns that repeat both in space and time. They are of paramount importance because they can be generated by undamped oscillators undergoing simple harmonic motion, and because any arbitrary wave shape can be decomposed into a sum of harmonic components through Fourier analysis.

```{phet} fourier-making-waves
:sim-name: Fourier: Making Waves
:label: fig:wave-fourier-sim

Build a wave from harmonic components and compare the sum to its spectrum. The same decomposition underlies the complex exponential representation used later in this chapter and the Fourier optics of {ref}`chapter:diff`.
```

### Spatial and Temporal Periodicity

The defining characteristic of harmonic waves is their periodic nature. In space, the pattern repeats over a distance called the wavelength, denoted by $\lambda$ (lambda). If we examine the wave at a fixed time and move along the x-axis, we find that the wave has identical values separated by a distance $\lambda$.

Mathematically, this spatial periodicity means:
$$y(x + \lambda, t) = y(x, t)$$

For this condition to hold with our harmonic wave function, we need:
$$k(x + \lambda) = kx + k\lambda = kx + 2\pi$$

This gives us the fundamental relationship:
$$k\lambda = 2\pi$$

Therefore, the propagation constant is:
$$k = \frac{2\pi}{\lambda}$$

Similarly, the wave exhibits temporal periodicity. At any fixed position, the wave repeats its pattern after a time interval called the period, denoted by $T$. This means:
$$y(x, t + T) = y(x, t)$$

For harmonic waves, this temporal periodicity requires:
$$kvT = 2\pi$$

Combining this with our expression for $k$, we obtain:
$$\frac{2\pi}{\lambda} \cdot v \cdot T = 2\pi$$

This simplifies to the fundamental wave relationship:
$$v = \frac{\lambda}{T} = \nu\lambda$$

where $\nu = 1/T$ is the frequency of the wave, representing the number of complete cycles per unit time.

### Wave Parameters and Relationships

Several important parameters characterize harmonic waves, and understanding their relationships is crucial for wave analysis:

**Angular frequency**: $\omega = 2\pi\nu = \frac{2\pi}{T}$

This parameter is particularly useful because it eliminates factors of $2\pi$ from many wave equations.

**Wave number**: $\kappa = \frac{1}{\lambda}$ (spatial frequency)

This represents the number of wavelengths per unit distance, complementing the temporal frequency $\nu$.

Using these parameters, we can write harmonic waves in several equivalent forms:
- $y = A \sin[k(x \pm vt)]$
- $y = A \sin[2\pi(\frac{x}{\lambda} \pm \frac{t}{T})]$
- $y = A \sin[(kx \pm \omega t)]$

The last form is particularly common because it clearly separates the spatial and temporal dependences of the wave.

### Phase and Phase Velocity

The argument of the sine or cosine function, $\varphi = k(x \pm vt)$, is called the phase of the wave. The phase determines the instantaneous value of the wave disturbance at any point in space and time.

Points of constant phase move through space at a specific velocity called the phase velocity. To find this velocity, we consider the condition for constant phase:

$$d\varphi = 0 = k(dx \pm vdt)$$

Solving for the velocity of points of constant phase:
$$\frac{dx}{dt} = ∓ v$$

This confirms that features of the wave (such as crests and troughs) move at speed $v$ in the direction determined by the sign in the wave function.

Often, we need to accommodate arbitrary initial conditions. This is accomplished by including an initial phase angle $\varphi_0$:

$$y = A \sin[k(x \pm vt) + \varphi_0]$$

The initial phase angle allows the wave to have any desired displacement and slope at $x = 0$ and $t = 0$, making the mathematical description completely general.

## Complex Numbers

### Complex Number Fundamentals

Before proceeding with advanced wave analysis, we must develop the mathematical tools of complex numbers, which greatly simplify harmonic wave calculations. A complex number $\tilde{z}$ can be written in rectangular form as:

$$\tilde{z} = a + ib$$

where $a$ is the real part, $b$ is the imaginary part, and $i$ is the imaginary unit defined by $i = \sqrt{-1}$. We denote the real and imaginary parts as:
- $a = \text{Re}(\tilde{z})$ (real part)
- $b = \text{Im}(\tilde{z})$ (imaginary part)

The magnitude or modulus of a complex number is found using the Pythagorean theorem:
$$|\tilde{z}| = \sqrt{a^2 + b^2}$$

Complex numbers can also be represented in polar form, which is particularly useful for wave analysis. In polar form:
$$\tilde{z} = |\tilde{z}|(\cos\theta + i\sin\theta)$$

where $\theta$ is the phase angle given by:
$$\theta = \tan^{-1}\left(\frac{b}{a}\right)$$

### Euler's Formula and Complex Exponentials

The most powerful representation of complex numbers for wave analysis uses Euler's formula:
$$e^{i\theta} = \cos\theta + i\sin\theta$$

This remarkable relationship allows us to write any complex number in exponential form:
$$\tilde{z} = |\tilde{z}|e^{i\theta}$$

Euler's formula immediately gives us useful relationships:
- $e^{i0} = \cos(0) + i\sin(0) = 1$
- $e^{i\pi/2} = \cos(\pi/2) + i\sin(\pi/2) = i$
- $e^{i\pi} = \cos(\pi) + i\sin(\pi) = -1$
- $e^{i3\pi/2} = \cos(3\pi/2) + i\sin(3\pi/2) = -i$

The complex conjugate of $\tilde{z}$ is denoted $\tilde{z}^*$ and is obtained by changing the sign of the imaginary part:
$$\tilde{z}^* = a - ib = |\tilde{z}|e^{-i\theta}$$

An important identity involving complex conjugates is:
$$\tilde{z}\tilde{z}^* = (a + ib)(a - ib) = a^2 + b^2 = |\tilde{z}|^2$$

This relationship proves invaluable when calculating physical quantities like energy and intensity, which depend on the square of the amplitude.

### Mathematical Operations

Complex numbers follow standard algebraic rules for addition and multiplication:

**Addition**: $\tilde{z}_1 + \tilde{z}_2 = (a_1 + a_2) + i(b_1 + b_2)$

**Multiplication**: When using exponential form, multiplication becomes particularly simple:
$$\tilde{z}_1 \tilde{z}_2 = |\tilde{z}_1||\tilde{z}_2|e^{i(\theta_1 + \theta_2)}$$

**Division**: Similarly, division in exponential form is straightforward:
$$\frac{\tilde{z}_1}{\tilde{z}_2} = \frac{|\tilde{z}_1|}{|\tilde{z}_2|}e^{i(\theta_1 - \theta_2)}$$

These properties make complex exponentials much easier to manipulate than trigonometric functions, which is why they are preferred for advanced wave analysis.

The key insight for wave applications is that linear differential equations satisfied by a complex function are also satisfied separately by its real and imaginary parts. This means we can perform calculations using the mathematically convenient complex exponential form and then extract the physically meaningful real or imaginary part as needed.

## Harmonic Waves as Complex Functions

### Complex Wave Representation

Using Euler's formula, we can express harmonic waves in complex exponential form, which greatly simplifies mathematical manipulations. A harmonic wave can be written as:

$$\tilde{y} = Ae^{i(kx-\omega t)}$$

where $\tilde{y}$ is the complex wave function. Using Euler's formula:
$$\tilde{y} = A[\cos(kx - \omega t) + i\sin(kx - \omega t)]$$

The physical wave disturbance is obtained by taking either the real or imaginary part:
- **Real part**: $y = \text{Re}(\tilde{y}) = A\cos(kx - \omega t)$
- **Imaginary part**: $y = \text{Im}(\tilde{y}) = A\sin(kx - \omega t)$

Both representations describe valid harmonic waves with the same wavelength, frequency, and propagation characteristics, differing only in their initial phase.

### Advantages of Complex Representation

The complex exponential representation offers several significant advantages over trigonometric functions:

**Linearity preservation**: If the complex function $\tilde{y}$ satisfies a linear differential equation, then both $\text{Re}(\tilde{y})$ and $\text{Im}(\tilde{y})$ satisfy the same equation. This means we can work with the mathematically simpler complex form throughout our calculations.

**Simplified differentiation**: Derivatives of complex exponentials are particularly simple:
$$\frac{\partial \tilde{y}}{\partial x} = ikAe^{i(kx-\omega t)} = ik\tilde{y}$$
$$\frac{\partial \tilde{y}}{\partial t} = -i\omega Ae^{i(kx-\omega t)} = -i\omega\tilde{y}$$

**Easy multiplication**: Products of exponential functions are much simpler to handle than products of trigonometric functions.

### Mathematical Manipulations

Consider the wave equation verification using complex notation. For our complex wave function $\tilde{y} = Ae^{i(kx-\omega t)}$:

$$\frac{\partial^2 \tilde{y}}{\partial x^2} = (ik)^2 \tilde{y} = -k^2\tilde{y}$$

$$\frac{\partial^2 \tilde{y}}{\partial t^2} = (-i\omega)^2 \tilde{y} = -\omega^2\tilde{y}$$

Substituting into the wave equation:
$$-k^2\tilde{y} = \frac{1}{v^2}(-\omega^2\tilde{y})$$

This simplifies to:
$$k^2 = \frac{\omega^2}{v^2}$$

or equivalently:
$$v = \frac{\omega}{k}$$

This confirms the fundamental relationship between wave speed, frequency, and wavelength, since $\omega = 2\pi\nu$ and $k = 2\pi/\lambda$.

### Practical Implementation

In practice, the procedure for using complex wave functions follows these steps:

1. **Express the wave in complex form**: Use $\tilde{y} = Ae^{i(kx-\omega t + \varphi_0)}$ where $\varphi_0$ accounts for initial phase.

2. **Perform mathematical operations**: Carry out all differentiations, integrations, and algebraic manipulations using the complex form.

3. **Extract the physical result**: Take the real part (or imaginary part, depending on the initial choice) to obtain the physically meaningful result.

This approach is particularly powerful when dealing with wave interference, diffraction, and other phenomena involving multiple waves, where the mathematical complexity of trigonometric approaches becomes prohibitive.

The complex representation also facilitates the transition to more advanced topics such as electromagnetic waves, where both electric and magnetic fields can be represented as complex vectors, and quantum mechanics, where wave functions are inherently complex.

## Plane Waves

### Three-Dimensional Wave Generalization

Up to this point, we have considered waves propagating along a single spatial dimension. However, real physical waves typically propagate through three-dimensional space in arbitrary directions. To describe such waves mathematically, we must generalize our one-dimensional harmonic wave expressions.

For three-dimensional propagation, the wave disturbance $\psi$ (which may represent displacement, pressure variation, electric field strength, or magnetic field strength) depends on all three spatial coordinates and time. A general three-dimensional wave takes the form:
$$\psi(x,y,z,t) = A \sin(\text{spatial phase} - \omega t)$$

The challenge is to determine the appropriate form for the spatial phase that correctly describes propagation in an arbitrary direction.

### Plane Wave Characteristics

Consider first the simple case of a wave propagating in the positive x-direction. The one-dimensional form is:
$$\psi = A\sin(kx - \omega t)$$

At a fixed time $t = 0$, this becomes:
$$\psi = A\sin(kx)$$

The condition for constant phase is $kx = \text{constant}$, which describes a family of planes perpendicular to the x-axis. Each plane is characterized by a different constant value of $kx$. As time progresses, these planes of constant phase move in the positive x-direction at the phase velocity $v = \omega/k$.

Because the wavefronts (surfaces of constant phase) are planar, these are called **plane waves**. This terminology distinguishes them from other wave geometries such as spherical or cylindrical waves.

### Sound Wave Example

Consider sound waves in air, where the disturbance represents pressure variations around the equilibrium atmospheric pressure. A sound wave propagating in the x-direction might be described by:
$$\psi = P - P_0 = (10~\text{N/m}^2)\sin[(2\pi/\text{m})x - (680\pi/\text{s})t]$$

where $P$ is the instantaneous pressure, $P_0 \approx 10^5~\text{N/m}^2$ is the equilibrium atmospheric pressure, and $\psi$ represents the pressure fluctuation.

From this expression, we can identify:
- Amplitude: $10~\text{N/m}^2$
- Wavelength: $\lambda = 2\pi/k = 1~\text{m}$
- Angular frequency: $\omega = 680\pi~\text{rad/s}$
- Wave speed: $v = \omega/k = 340~\text{m/s}$

The wavefronts are planes perpendicular to the x-axis, moving in the positive x-direction. In principle, these planes extend infinitely in the y and z directions, though in practice, this is an approximation valid for limited spatial regions.

### Vector Formulation

To describe plane waves propagating in arbitrary directions, we introduce the **propagation vector** $\vec{k}$. This vector has magnitude $k = 2\pi/\lambda$ and points in the direction of wave propagation.

For a wave propagating in an arbitrary direction, we can write:
$$\psi = A\sin(\vec{k} \cdot \vec{r} - \omega t)$$

where $\vec{r} = x\hat{x} + y\hat{y} + z\hat{z}$ is the position vector to any point in space.

The dot product $\vec{k} \cdot \vec{r}$ can be expanded as:
$$\vec{k} \cdot \vec{r} = k_x x + k_y y + k_z z$$

where $k_x$, $k_y$, and $k_z$ are the components of the propagation vector. Alternatively, if $\theta$ is the angle between $\vec{k}$ and $\vec{r}$:
$$\vec{k} \cdot \vec{r} = kr\cos\theta = ks$$

where $s$ represents the distance along the propagation direction measured from some reference plane perpendicular to $\vec{k}$.

### Wavefront Geometry

The surfaces of constant phase are defined by:
$$\vec{k} \cdot \vec{r} = \text{constant}$$

This equation describes planes perpendicular to the propagation vector $\vec{k}$. As time advances, these planes move in the direction of $\vec{k}$ at the phase velocity $v = \omega/k$.

The spacing between adjacent wavefronts (corresponding to a phase difference of $2\pi$) is the wavelength $\lambda = 2\pi/k$. The direction normal to the wavefronts is given by the unit vector $\hat{k} = \vec{k}/k$.

### Physical Interpretation

Plane waves represent an idealization that is exactly realized only for waves with infinite extent perpendicular to the propagation direction. However, this idealization is practically useful in many situations:

1. **Far-field approximation**: At large distances from a localized source, wavefronts become approximately planar over limited regions.

2. **Beam approximation**: Well-collimated beams (such as laser beams) can be approximated as plane waves over their cross-sectional area.

3. **Local analysis**: Even for curved wavefronts, the local behavior can often be approximated as planar over sufficiently small regions.

The plane wave concept provides the foundation for understanding more complex wave phenomena, including interference, diffraction, and the propagation of electromagnetic radiation through various media.

## Spherical Waves

### Three-Dimensional Wave Equation

To understand spherical waves, we must first generalize the wave equation to three dimensions. The one-dimensional wave equation involved second derivatives with respect to position and time. In three dimensions, we must account for spatial variations in all three coordinate directions.

The three-dimensional wave equation is written using the Laplacian operator:
$\nabla^2\psi = \frac{1}{v^2}\frac{\partial^2\psi}{\partial t^2}$

where the Laplacian operator in Cartesian coordinates is:
$\nabla^2 = \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + \frac{\partial^2}{\partial z^2}$

This differential equation describes how wave disturbances propagate through three-dimensional space. Just as the one-dimensional wave equation was satisfied by functions of the form $f(x \pm vt)$, the three-dimensional equation has solutions that depend on the specific geometry of the wave source.

### Spherical Wave Solutions

When a wave is generated by a point source, the resulting wavefronts are spherical surfaces centered at the source location. For such waves, it is natural to use spherical coordinates $(r, \theta, \phi)$ where $r$ is the radial distance from the source.

For a spherically symmetric wave (one that depends only on $r$ and $t$, not on the angular coordinates $\theta$ and $\phi$), the Laplacian simplifies considerably. The solution to the three-dimensional wave equation for outward-propagating spherical waves is:

$\psi = \left(\frac{A}{r}\right)e^{i(kr-\omega t)}$

where $r$ is the radial distance from the point source, $k = 2\pi/\lambda$ is the propagation constant, and $\omega = 2\pi/T$ is the angular frequency.

The physical wave disturbance is obtained by taking the real or imaginary part:
$\psi = \frac{A}{r}\cos(kr - \omega t) \quad \text{or} \quad \psi = \frac{A}{r}\sin(kr - \omega t)$

### Amplitude and Intensity Characteristics

The most striking feature of spherical waves is the $1/r$ dependence of the amplitude. Unlike plane waves, where the amplitude remains constant as the wave propagates, spherical wave amplitudes decrease inversely with distance from the source.

This amplitude variation has profound physical consequences. The **irradiance** (power per unit area) of a wave is proportional to the square of the amplitude. For spherical waves:

$\text{Irradiance} \propto \left(\frac{A}{r}\right)^2 \propto \frac{1}{r^2}$

This $1/r^2$ dependence is known as the **inverse square law** and is fundamental to understanding how energy spreads out from point sources. The physical reason is conservation of energy: as the wave spreads out over spherical surfaces of increasing area ($4\pi r^2$), the energy density must decrease to maintain constant total power flow.

### Physical Examples and Applications

Spherical waves provide good approximations for many real physical situations:

**Sound from a point source**: A small speaker or explosion creates approximately spherical sound waves. The pressure amplitude decreases as $1/r$, and the acoustic intensity follows the inverse square law.

**Light from a point source**: Stars, light bulbs, and other compact sources produce approximately spherical electromagnetic waves. This explains why stars appear dimmer at greater distances.

**Seismic waves**: Earthquakes generate spherical seismic waves that spread outward through the Earth. The amplitude decay helps determine earthquake magnitudes and source locations.

### Limitations and Approximations

Real spherical waves have limitations that must be considered:

1. **Finite distances**: The spherical wave solution is valid only at finite distances from the source. At the source location ($r = 0$), the amplitude becomes infinite, indicating that the point source approximation breaks down.

2. **Small regions**: Over sufficiently small spatial regions, spherical wavefronts can be approximated as planar. This approximation improves with increasing distance from the source.

3. **Absorption and scattering**: In real media, absorption and scattering modify the simple $1/r$ amplitude dependence.

Despite these limitations, spherical waves provide essential insights into wave propagation from localized sources and form the basis for understanding more complex wave phenomena.

## Other Harmonic Waveforms

### Cylindrical Waves

Between the extremes of plane waves (infinite planar sources) and spherical waves (point sources) lies another important geometry: cylindrical waves. These arise when the wave source has cylindrical symmetry, such as a long straight wire antenna or a line of oscillating sources.

For cylindrical waves, the wavefronts form outward-moving cylindrical surfaces around a line of symmetry (typically the z-axis). The mathematical form of cylindrical waves is:

$\psi = \frac{A}{\sqrt{\rho}}e^{i(k\rho - \omega t)}$

where $\rho = \sqrt{x^2 + y^2}$ is the perpendicular distance from the line of symmetry.

The amplitude variation for cylindrical waves is proportional to $1/\sqrt{\rho}$, which is intermediate between the constant amplitude of plane waves and the $1/r$ dependence of spherical waves. Correspondingly, the intensity falls off as $1/\rho$, which is slower than the $1/r^2$ behavior of spherical waves.

**Physical interpretation**: The slower decay rate occurs because energy spreads over cylindrical surfaces with area proportional to $\rho$ (rather than $r^2$ for spherical surfaces). This makes cylindrical waves important for understanding propagation from linear sources such as:
- Radio transmission lines
- Acoustic waves from straight edges
- Optical waves emerging from narrow slits

### Gaussian Beams

**Gaussian beams** form an important family of wave solutions that finds extensive application in laser physics and optical engineering. They represent approximate solutions to the wave equation that describe beamlike propagation with strong confinement in the transverse direction.

Gaussian beams are characterized by several key parameters:

**Beam waist**: The location where the beam has its minimum transverse size, denoted $w_0$. This represents the "focus" of the beam.

**Spot size parameter**: $w(z)$ defines the transverse distance at which the irradiance falls to $1/e^2$ of its on-axis value. The spot size varies with distance along the beam according to:

$w(z) = w_0\sqrt{1 + \left(\frac{z}{z_R}\right)^2}$

where $z_R = \pi w_0^2/\lambda$ is the Rayleigh range.

**Divergence**: Far from the beam waist, Gaussian beams exhibit a characteristic half-angle divergence:

$\theta = \frac{\lambda}{\pi w_0}$

This relationship shows that smaller beam waists lead to larger divergence angles, reflecting the wave nature of light and the uncertainty principle.

### Hermite-Gaussian Modes

More complex Gaussian beam solutions include the **Hermite-Gaussian modes**, which are produced by laser systems using spherical mirrors. These modes have intensity distributions described by products of Hermite polynomials and Gaussian functions.

The fundamental Hermite-Gaussian mode (TEM₀₀) has a purely Gaussian transverse profile and represents the lowest-order laser mode. Higher-order modes (TEM₁₀, TEM₀₁, TEM₁₁, etc.) have more complex transverse patterns but maintain the same basic propagation characteristics.

These modes are important because:
- They represent the natural oscillation patterns of laser resonators
- They maintain their transverse profile during propagation
- They provide a complete basis for describing arbitrary beam shapes

### Applications and Practical Considerations

Gaussian beams are particularly important in practical optics because:

**Laser output**: Most lasers produce output beams that closely approximate Gaussian profiles, especially in the fundamental TEM₀₀ mode.

**Fiber optics**: The modes of step-index optical fibers can be approximated as Gaussian beams, making this formalism useful for fiber-optic communications.

**Optical instruments**: Focusing and imaging systems often work with Gaussian beams, and understanding their propagation properties is essential for optical design.

**Measurement and characterization**: The mathematical description of Gaussian beams provides the foundation for measuring and characterizing laser beam quality.

The Gaussian beam approximation is generally valid in regions close to the beam axis where the paraxial approximation holds. For applications requiring consideration of the full three-dimensional wave behavior, more sophisticated treatments using vector diffraction theory may be necessary.

## Electromagnetic Waves

### General Wave Disturbance Types

The harmonic waveforms we have studied can represent any type of sinusoidally varying wave disturbance. In mechanical systems, $\psi$ might represent transverse or longitudinal displacements of a vibrating string or pressure variations in acoustic waves. However, the most important application of wave theory for modern physics and technology involves electromagnetic waves.

In electromagnetic waves, the wave disturbance is not a mechanical displacement but rather the strength of electric and magnetic fields. These fields can propagate through vacuum without requiring any material medium, making electromagnetic waves fundamentally different from mechanical waves.

```{openlyceum} FieldBoundary
:label: fig:wave-field-boundary-sim

Maxwell boundary conditions at a planar interface: drag the incident field, change $\varepsilon_r$ or $\mu_r$, and watch which components of $\vec{E}/\vec{D}$ (and $\vec{H}/\vec{B}$) stay continuous. This is the field-continuity picture behind reflection and refraction, not the ray construction of Snell's law.
```

### Electromagnetic Field Representation

Electromagnetic waves consist of coupled electric and magnetic field oscillations. Both fields can be represented using our harmonic wave formalism:

**Electric field**: $\vec{E} = \vec{E}_0 \sin(\vec{k} \cdot \vec{r} - \omega t)$

**Magnetic field**: $\vec{B} = \vec{B}_0 \sin(\vec{k} \cdot \vec{r} - \omega t)$

where $\vec{E}_0$ and $\vec{B}_0$ are the respective field amplitude vectors.

The remarkable feature of electromagnetic waves is that both fields share the same propagation vector $\vec{k}$, angular frequency $\omega$, wavelength $\lambda$, and propagation speed. This coupling arises from Maxwell's equations, which relate the electric and magnetic fields and predict their wave-like propagation.

### Speed of Light and Electromagnetic Constants

Maxwell's equations predict that electromagnetic waves propagate in vacuum at a speed given by:

$c = \frac{1}{\sqrt{\varepsilon_0\mu_0}}$

where:
- $\varepsilon_0 = 8.8542 \times 10^{-12}~\text{C}^2/\text{N} \cdot \text{m}^2$ is the permittivity of free space
- $\mu_0 = 4\pi \times 10^{-7}~\text{kg} \cdot \text{m}/(\text{A} \cdot \text{s})^2$ is the permeability of free space

Substituting these fundamental constants:
$c = 2.998 \times 10^8~\text{m/s}$

This is the speed of light in vacuum, one of the most important constants in physics. All electromagnetic radiation—radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, and gamma rays—propagates at this speed in vacuum.

**Human vision range**: The small portion of the electromagnetic spectrum visible to human eyes spans wavelengths from approximately 380 nm (violet) to 770 nm (red). This represents less than one octave of the vast electromagnetic spectrum.

### Maxwell's Equations and Field Relationships

Maxwell's equations establish specific relationships between the electric and magnetic field amplitudes. For plane waves propagating in vacuum:

$E_0 = cB_0$

This means the electric field amplitude (in V/m) equals the speed of light times the magnetic field amplitude (in T). The electric and magnetic fields are also perpendicular to each other and to the direction of propagation, making electromagnetic waves **transverse waves**.

### Energy Density and Power Flow

Electromagnetic waves carry energy stored in both electric and magnetic fields. The energy densities are:

**Electric energy density**: $u_E = \frac{1}{2}\varepsilon_0 E^2$

**Magnetic energy density**: $u_B = \frac{1}{2\mu_0}B^2$

For electromagnetic waves in vacuum, these energy densities are equal: $u_E = u_B$. The total electromagnetic energy density is:

$u = u_E + u_B = \varepsilon_0 E^2 = \frac{1}{\mu_0}B^2$

### Poynting Vector and Irradiance

The flow of electromagnetic energy is described by the **Poynting vector**:

$\vec{S} = \frac{1}{\mu_0}\vec{E} \times \vec{B}$

The magnitude of the Poynting vector gives the instantaneous power per unit area (irradiance) flowing in the direction of $\vec{E} \times \vec{B}$. For harmonic waves:

$|\vec{S}| = \frac{1}{\mu_0}E_0 B_0 \sin^2(\vec{k} \cdot \vec{r} - \omega t)$

The time-averaged irradiance is:

$E_e = \langle|\vec{S}|\rangle = \frac{1}{2\mu_0}E_0 B_0 = \frac{1}{2}\varepsilon_0 c E_0^2 = \frac{c}{2\mu_0}B_0^2$

### Example 4-2: Laser Beam Calculation

**Problem**: A laser beam with radius 1.0 mm carries 6.0 kW of power. Find the electric and magnetic field amplitudes.

**Solution**:
The irradiance is:
$E_e = \frac{\text{power}}{\text{area}} = \frac{6000~\text{W}}{\pi(1.0 \times 10^{-3}~\text{m})^2} = 1.91 \times 10^9~\text{W/m}^2$

From the irradiance formula:
$E_0 = \sqrt{\frac{2E_e}{\varepsilon_0 c}} = \sqrt{\frac{2 \times 1.91 \times 10^9}{8.854 \times 10^{-12} \times 2.998 \times 10^8}} = 1.20 \times 10^6~\text{V/m}$

The magnetic field amplitude is:
$B_0 = \frac{E_0}{c} = \frac{1.20 \times 10^6}{2.998 \times 10^8} = 4.00 \times 10^{-3}~\text{T}$

These are remarkably large field strengths, illustrating the intensity achievable with focused laser beams.

## Light Polarization

### Electromagnetic Field Relationships

One of the most important characteristics of electromagnetic waves is their **polarization**, which refers to the orientation of the electric field vector. Since the electric field $\vec{E}$, magnetic field $\vec{B}$, and propagation direction are mutually perpendicular, specifying the direction of $\vec{E}$ completely determines the wave's spatial orientation.

The direction of energy flow is given by the Poynting vector $\vec{S} = \frac{1}{\mu_0}\vec{E} \times \vec{B}$, which points in the direction of wave propagation. Once we specify $\vec{E}$ and the propagation direction, the magnetic field $\vec{B}$ is uniquely determined by Maxwell's equations.

### Linear Polarization Example

Consider an electromagnetic wave propagating in the +z direction with the electric field oscillating in the x-direction:

$\vec{E} = E_0 \sin(kz - \omega t)\hat{x}$

Maxwell's equations then require:

$\vec{B} = \frac{E_0}{c} \sin(kz - \omega t)\hat{y}$

The Poynting vector becomes:

$\vec{S} = \frac{1}{\mu_0}\vec{E} \times \vec{B} = \frac{\varepsilon_0 c E_0^2}{2} \sin^2(kz - \omega t)\hat{z}$

This wave is said to be **linearly polarized** in the x-direction because the electric field vector always points along the x-axis, varying only in magnitude.

### General Linear Polarization

Linear polarization is not restricted to the coordinate axes. If the electric field oscillates along any fixed direction perpendicular to the propagation direction, the wave is linearly polarized. For example:

$\vec{E} = E_0 \sin(kz - \omega t)(\hat{x} + \hat{y})/\sqrt{2}$

represents a wave linearly polarized at 45° to the x-axis.

### Lorentz Force and Particle Motion

The polarization of electromagnetic waves has direct physical consequences for charged particles in the wave's path. The **Lorentz force law** states:

$\vec{F} = Q(\vec{E} + \vec{V} \times \vec{B})$

For non-relativistic particles, the electric force typically dominates over the magnetic force because $|\vec{V}| << c$. Therefore, the force on a charged particle is primarily in the direction of the electric field, which is the polarization direction.

This relationship explains why:
- Polarizing filters work by preferentially transmitting certain polarization directions
- Antennas are most sensitive to electromagnetic waves whose electric field aligns with the antenna orientation
- Scattering of light by particles depends on the polarization state

### Circular and Elliptical Polarization

More complex polarization states arise when the electric field vector rotates as the wave propagates. **Circular polarization** occurs when the electric field vector traces out a circle perpendicular to the propagation direction:

$\vec{E} = E_0[\sin(kz - \omega t)\hat{x} + \cos(kz - \omega t)\hat{y}]$

This can be written more compactly using complex notation:

$\vec{E} = E_0 \text{Re}[e^{i(kz - \omega t)}(\hat{x} + i\hat{y})]$

**Right-hand circular polarization** corresponds to the electric field vector rotating clockwise when viewed looking back toward the source, while **left-hand circular polarization** involves counterclockwise rotation.

**Elliptical polarization** represents the most general case, where the electric field vector traces an ellipse. This occurs when the x and y components have different amplitudes and/or phase relationships.

### Unpolarized Light

Individual atoms and molecules emit electromagnetic radiation with random, rapidly fluctuating polarization directions. When many such independent sources contribute to a light beam, the result is **unpolarized** or **randomly polarized** light.

Unpolarized light can be thought of as an incoherent superposition of electromagnetic fields with differing random polarizations. The polarization direction changes randomly on time scales much shorter than any measurement time, so no preferred polarization direction is observed.

**Partially polarized light** occurs when one or more polarization directions predominate over others, but complete polarization is not achieved. This commonly occurs in reflected light, scattered light, and light from extended sources.

### Polarization Control and Applications

Polarized light can be produced from unpolarized light using various optical elements:

**Polarizing filters**: Transmit light whose electric field oscillates in one direction while absorbing light with perpendicular polarization.

**Reflection**: Light reflected from surfaces at specific angles (Brewster's angle) becomes partially or completely polarized.

**Scattering**: Rayleigh scattering of sunlight by air molecules produces partially polarized skylight.

**Birefringent materials**: Crystals with different refractive indices for different polarizations can separate unpolarized light into orthogonal polarized components.

Applications of polarization control include:
- Liquid crystal displays (LCDs)
- Polarizing sunglasses to reduce glare
- Optical stress analysis
- 3D movie projection systems
- Laser interferometry and precision measurements

## Doppler Effect

### Fundamental Concept

The **Doppler effect** refers to the change in observed frequency (or wavelength) of waves when there is relative motion between the source and observer. This phenomenon occurs for all types of waves, but the physical mechanisms differ significantly between sound waves and electromagnetic waves.

For sound waves, the Doppler effect arises because sound propagates through a material medium (air, water, etc.), and the relative motion of source and observer with respect to this medium affects the observed frequency. In contrast, electromagnetic waves require no medium and propagate through vacuum, so only the relative motion between source and observer matters.

### Sound vs. Light Distinction

**Sound waves**: The Doppler shift depends on both the source velocity and observer velocity relative to the medium. Different formulas apply depending on whether the source, observer, or both are moving relative to the air.

**Light waves**: Since electromagnetic waves propagate through vacuum without a medium, there is no preferred reference frame. Only the relative velocity between source and observer determines the frequency shift, and the analysis requires special relativity.

This fundamental difference means that sound and light exhibit different Doppler shift behaviors, even though the basic phenomenon appears similar.

### Mathematical Expression for Light

For electromagnetic waves, special relativity gives the exact Doppler shift formula:

$\frac{\lambda'}{\lambda} = \sqrt{\frac{1 + v/c}{1 - v/c}}$

where:
- $\lambda'$ is the observed wavelength
- $\lambda$ is the emitted wavelength
- $v$ is the radial velocity of the source relative to the observer
- $c$ is the speed of light

**Sign convention**:
- Positive $v$: source receding from observer (redshift, longer wavelength)
- Negative $v$: source approaching observer (blueshift, shorter wavelength)

For frequencies, the relationship becomes:

$\frac{\nu'}{\nu} = \sqrt{\frac{1 - v/c}{1 + v/c}}$

### Non-Relativistic Approximation

When the relative velocity is much smaller than the speed of light ($v << c$), we can use the binomial approximation to simplify the formula:

$\frac{\lambda'}{\lambda} \approx 1 - \frac{v}{c}$

or equivalently:

$\frac{\nu'}{\nu} \approx 1 + \frac{v}{c}$

This approximation is adequate for most terrestrial applications but becomes inaccurate for high-speed astronomical objects or relativistic particles.

### Astronomical Applications

The Doppler effect is one of the most important tools in astronomy for measuring velocities of distant objects:

**Stellar velocities**: The wavelengths of spectral lines from stars are compared with laboratory measurements to determine radial velocities. Lines shifted toward longer wavelengths (redshift) indicate recession, while lines shifted toward shorter wavelengths (blueshift) indicate approach.

**Galactic recession**: Edwin Hubble's observations of galactic redshifts provided the first evidence for the expansion of the universe. The relationship between redshift and distance (Hubble's law) forms the foundation of modern cosmology.

**Exoplanet detection**: Small periodic Doppler shifts in stellar spectra can reveal the presence of orbiting planets through the gravitational wobble they induce in their parent star.

### Example 4-3: Galaxy Recession Speed

**Problem**: A spectral line from oxygen, which has a laboratory wavelength of 513 nm, is observed at 525 nm in light from a distant galaxy. What is the galaxy's recession speed?

**Solution**: Using the Doppler formula:
$\frac{\lambda'}{\lambda} = \frac{525}{513} = 1.0234$

For recession (redshift), we have:
$1.0234 = \sqrt{\frac{1 + v/c}{1 - v/c}}$

Squaring both sides:
$(1.0234)^2 = \frac{1 + v/c}{1 - v/c}$

Solving for $v/c$:
$1.0473 = \frac{1 + v/c}{1 - v/c}$
$1.0473(1 - v/c) = 1 + v/c$
$1.0473 - 1.0473v/c = 1 + v/c$
$0.0473 = v/c(1 + 1.0473) = 2.0473v/c$

Therefore:
$\frac{v}{c} = \frac{0.0473}{2.0473} = 0.0231$

$v = 0.0231c = 0.0231 \times 2.998 \times 10^8 = 6.93 \times 10^6~\text{m/s} = 6930~\text{km/s}$

This galaxy is receding from Earth at approximately 6930 km/s, which is about 2.3% of the speed of light.

### Additional Doppler Applications

**Doppler radar**: Weather radar and police radar use the Doppler effect with electromagnetic waves to measure the velocity of precipitation or vehicles. The reflected waves have frequencies shifted by the motion of the reflecting objects.

**Medical imaging**: Doppler ultrasound uses sound waves to measure blood flow velocities and detect cardiovascular abnormalities.

**Atomic physics**: Doppler broadening occurs when atoms in a gas move with thermal velocities, causing spectral lines to broaden due to the range of Doppler shifts from different atoms.

**Satellite communications**: Doppler shifts must be compensated in satellite communication systems, especially for low Earth orbit satellites that have high relative velocities with respect to ground stations.

The Doppler effect thus provides a powerful tool for measuring velocities across an enormous range of scales, from atomic motions to cosmic expansion, making it one of the most practically important wave phenomena in modern science and technology.

## Chapter Summary

- **The wave equation** $\frac{\partial^2 u}{\partial x^2} = \frac{1}{v^2}\frac{\partial^2 u}{\partial t^2}$ describes wave propagation in one dimension.
- **Harmonic waves** have the form $u = A\cos(kx - \omega t + \phi)$, characterized by amplitude $A$, wave number $k$, and angular frequency $\omega$.
- **Wavelength** ($\lambda = 2\pi/k$), **frequency** ($f = \omega/2\pi$), and **phase velocity** ($v = \omega/k = f\lambda$) are related by $v = f\lambda$.
- **Complex notation** simplifies wave mathematics: $U = Ae^{i(kx-\omega t)}$ represents a traveling wave.
- **Plane waves** propagate in 3D with wave vector $\mathbf{k}$; surfaces of constant phase are planes perpendicular to $\mathbf{k}$.
- **Spherical waves** spread from point sources with amplitude decreasing as $1/r$ (intensity as $1/r^2$).
- **Electromagnetic waves**: $\mathbf{E}$ and $\mathbf{B}$ are perpendicular to each other and to the propagation direction; $c = 1/\sqrt{\epsilon_0\mu_0}$.
- **Intensity** is proportional to the time-averaged Poynting vector: $I = \frac{1}{2}\epsilon_0 c |E_0|^2$.
- **Group velocity** $v_g = d\omega/dk$ describes the speed of wave packets and energy transport in dispersive media.
- **The Doppler effect** shifts observed frequency when source and observer have relative motion: redshift for recession, blueshift for approach.
