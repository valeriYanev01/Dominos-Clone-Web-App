export interface SliderInfo {
  caption: string,
  valid: string,
  desc: string
}

export interface DealInfo {
  headerImg: string,
  heading: string,
  desc: string,
  method: { carryOut: string | undefined, delivery: string | undefined },
  deal: boolean
}

export interface GadgetInfo {
  bgColor: "#e31837" | "#006491",
  title: string,
  description: string,
  btnBg: "#000" | "#FFF",
  btnLink: string,
  btnText: string
  btnColor: "#fff" | "#0f74a8"
}