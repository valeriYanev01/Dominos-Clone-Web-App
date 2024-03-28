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