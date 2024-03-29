export interface SliderInfo {
  caption: string,
  valid: string,
  desc: string
}

export interface DealInfo {
  headerImg: string,
  heading: string,
  desc: string,
  method: { carryOut: string | null, delivery: string | null }
}

export interface GadgetInfo {
  bgColor: "#e31837" | "#006491",
  title: string,
  description: string,
  btnBg: "#000" | "#FFF",
  btnLink: string,
  btnText: string
}