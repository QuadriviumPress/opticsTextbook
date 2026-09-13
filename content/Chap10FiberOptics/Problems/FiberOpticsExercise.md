# Problems

**Problem 10.1** Make a mindmap of the material covered in this chapter. For more information about mindmaps, see [Wikipedia](https://en.wikipedia.org/wiki/Mind_map)

**Problem 10.2** Describe the (possible) relevance of fiber optics in your line of work.

**Problem 10.3** Explain why for optical fiber communication lines the wavelength of choice are $1310$ and $1550~\text{nm}$.

**Problem 10.4** Show that the phase factor $(m-1)\pi$ in {eq}`eq:fiber:downPropagatingWave`
   indeed leads to a vanishing $E$-field at the mirrors. Is this the only
   possible solution?

**Problem 10.5** A plastic fiber has a core refractive index of $n_1=1.49$ and a cladding refractive index of $n_2=1.38$. Its core diameter is $1.00~\text{mm}$ and light with a wavelength of $633~\text{nm}$ is coupled into the fiber from air ($n_{\text{e}}=1.00$). Calculate:
**(a)** the internal critical angle $\theta_{\text{i,c}}$
**(b)** the (external) critical angle $\bar{\theta}_{\text{e,c}}$
**(c)** the $\Delta$-parameter (Can you use the approximation?)
**(d)** the numerical aperture
**(e)** the $V$-number (Is this a singlemode or multimode fiber?)
**(f)** the cut-off wavelength

**Problem 10.6** Describe, in your own words, the effect of dispersion on a short pulse. What is the maximum length of fiber of a loss-less datalink, given that the dispersion parameter of the fiber $D=20~\text{ps/km}\cdot \text{nm}$ and the laser used to communicate has a spectral width of $1.0~\text{nm}$? The laser can send light pulses at a rate of $10~\text{GHz}$.

**Problem 10.7** What is the maximum length of fiber of a dispersion-less datalink, given that the loss of the fiber $\alpha_{\text{dB}}=0.30~\text{dB/km}$ and a light pulse can no longer be discriminated from the background noise if $99\%$ of the light is lost?

**Problem 10.8** Estimate the loss (in dB) due to the following situations in which two single mode fibers are coupled incorrectly:

**(a)** a fiber with a core diameter of $7.0~\mu\text{m}$ is coupled to a fiber with core diameter $6.0~\mu\text{m}$ (see {numref}`fig:fiber:couplingLoss`).

**(b)** a $500~\mu\text{m}$-air gap exists in between two fibers (see {numref}`fig:fiber:couplingLoss`). Both have a numerical aperture equal to $0.12$ and a core diameter of $6.0~\mu\text{m}$.

To make your estimation, neglect reflection due to refractive index mismatch and assume the incoming light has a Gaussian beam profile with intensity
```{math}
\begin{align*}
I(r,z)=I_0\left(\frac{d/4}{d/4+\mathrm{NA}\cdot z}\right)^2\exp\left(\frac{-2r^2}{(d/4+\mathrm{NA}\cdot z)^2}\right).
\end{align*}
```

Here, $r$ is the radial coordinate in the $(x,y)$-plane (see {numref}`fig:fiber:tir`). Integrate over the fiber core into which the light is coupled and divide by $I_0$.

Note that these calculations are simplified, but they give a rough estimate of coupling losses.
