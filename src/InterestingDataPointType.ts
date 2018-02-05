export enum InterestingDataPointType {
  UsesCyno,
  UsesCovertCyno
}

export function interestingDataPointDescription(type: InterestingDataPointType): string {
  switch (type) {
  case InterestingDataPointType.UsesCyno:
    return 'Lost a ship with a Cyno fitted'
  case InterestingDataPointType.UsesCovertCyno:
    return 'Lost a ship with a Covert Cyno fitted'
  }
}
