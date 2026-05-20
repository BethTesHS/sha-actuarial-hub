import {
  module1Data,
  module2Data,
  module3Data,
  module4Data,
  module5Data,
  module6Data,
  module7Data,
  module8Data,
  module9Data,
} from "./modules";

export const MODULE_DATA_BY_ID = {
  1: module1Data,
  2: module2Data,
  3: module3Data,
  4: module4Data,
  5: module5Data,
  6: module6Data,
  7: module7Data,
  8: module8Data,
  9: module9Data,
};

export const TRAINING_MODULES = Object.entries(MODULE_DATA_BY_ID).map(([id, data]) => ({
  id: Number(id),
  moduleId: String(id),
  name: data?.title || `Module ${id}`,
  data,
}));
