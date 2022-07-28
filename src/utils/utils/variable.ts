const enum EProtocol {
  MODBUS = 'MODBUS',
  MQTT = 'MQTT'
}

const enum EDataFlag {
  ALARM = 'ALARM',
  FAULT = 'FAULT',
  STATUS = 'STATUS'
}
export const enum EDataType {
  AI = 'AI',
  DI = 'DI'
}

// 储区形式
const enum EUnitType {
  E_SHELF = 'E_SHELF',
  FLAT = 'FLAT',
  SHELF = 'SHELF'
}

// 储位属性
const enum ECellAttr {
  OTHER = 'OTHER',
  PICK_UP = 'PICK_UP',
  PUT_DOWN = 'PUT_DOWN'
}
// 储位状态
const enum ECellStatus {
  FREE = 'FREE',
  LOCK = 'LOCK',
  USED = 'USED'
}

export const PROTOCOL = [EProtocol.MODBUS, EProtocol.MQTT]
export const DATAFLAG = [EDataFlag.ALARM, EDataFlag.FAULT, EDataFlag.STATUS]
export const DATATYPE = [EDataType.AI, EDataType.DI]
export const UNITTYPE = [EUnitType.E_SHELF, EUnitType.FLAT, EUnitType.SHELF]
export const CELLATTR = [ECellAttr.OTHER, ECellAttr.PICK_UP, ECellAttr.PUT_DOWN]
export const CELLSTATUS = [ECellStatus.FREE, ECellStatus.LOCK, ECellStatus.USED]
