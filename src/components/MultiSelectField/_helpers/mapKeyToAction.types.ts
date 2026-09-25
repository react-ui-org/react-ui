export type KeyAction = 'activateFirst'
  | 'activateLast'
  | 'activateNext'
  | 'activatePrevious'
  | 'close'
  | 'deactivate'
  | 'focusLastTag'
  | 'open'
  | 'openAndActivateFirst'
  | 'openAndActivateLast'
  | 'toggleActive';

export type KeyActionContext = {
  // Backspace may move focus to the last tag, i.e. the search is empty and there are tags
  canFocusLastTag: boolean;
  hasActiveOption: boolean;
  // The input accepts typing, i.e. search is enabled
  isEditable: boolean;
  isOpen: boolean;
};
