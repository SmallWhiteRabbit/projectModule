export const enum EProtocol {
  MODBUS = 'MODBUS',
  MQTT = 'MQTT'
}

export const enum EDataFlag {
  ALARM = 'ALARM',
  FAULT = 'FAULT',
  STATUS = 'STATUS'
}
export const enum EDataType {
  AI = 'AI',
  DI = 'DI'
}

// 储区形式
export const enum EUnitType {
  E_SHELF = 'E_SHELF',
  FLAT = 'FLAT',
  SHELF = 'SHELF'
}

// 储位属性
export const enum ECellAttr {
  OTHER = 'OTHER',
  PICK_UP = 'PICK_UP',
  PUT_DOWN = 'PUT_DOWN'
}
// 储位状态
export const enum ECellStatus {
  FREE = 'FREE',
  LOCK = 'LOCK',
  USED = 'USED'
}

export const protocol = [EProtocol.MODBUS, EProtocol.MQTT]
export const dataFlag = [EDataFlag.ALARM, EDataFlag.FAULT, EDataFlag.STATUS]
export const dataType = [EDataType.AI, EDataType.DI]
export const UnitType = [EUnitType.E_SHELF, EUnitType.FLAT, EUnitType.SHELF]
export const CellAttr = [ECellAttr.OTHER, ECellAttr.PICK_UP, ECellAttr.PUT_DOWN]
export const CellStatus = [ECellStatus.FREE, ECellStatus.LOCK, ECellStatus.USED]
