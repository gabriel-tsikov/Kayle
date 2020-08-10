export interface IModalState {
  shouldShow: boolean;
  props?: IModalProps;
  component?: any;
}

export interface IModalProps {
  maxWidth?: number;
  maxHeight?: number;
  autoWidth?: boolean;
  headerText?: string;
  paddingTop?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingBottom?: number;
  shouldHideCloseButton?: boolean;
  shouldCloseOnOutsideClick?: boolean;
}
