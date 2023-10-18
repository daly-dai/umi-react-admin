import type { ColProps, FormItemProps, FormProps, RowProps } from 'antd';
import type { FormListProps } from 'antd/lib/form';
import type {
  ComponentProps,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from 'react';
import type { FormTableFieldComponent } from '.';

export type FormTableFieldComponentType = typeof FormTableFieldComponent;

export interface FieldListItemType<F, B extends boolean> {
  key?: string | number;
  isList?: B;
  name?: B extends true
    ? FormListProps['name']
    : FormItemProps<F>['name'] | undefined;
  label?: string | ReactNode;
  fieldType?: keyof FormTableFieldComponentType | false;
  fieldComponent?:
    | FormTableFieldComponentType[keyof FormTableFieldComponentType]
    | ElementType;
  formItemProps?: B extends true ? never : FormItemProps;
  formListProps?: B extends true ? FormListProps : never;
  fieldProps?: HTMLAttributes<object> &
    ComponentProps<
      FormTableFieldComponentType[keyof FormTableFieldComponentType]
    >;
  fieldChildren?: ReactNode;
  colProps?: ColProps;
  formListChildren?: FormListProps['children'];
  extraContent?: ReactNode;
}

export interface GroupListItemType<F> {
  title?: string | ReactNode;
  rowProps?: RowProps;
  fieldList?: (FieldListItemType<F, true> | FieldListItemType<F, false>)[];
  key?: string | number;
}

export interface FormGroupRowProps<F> {
  row: GroupListItemType<F>;
  readOnly?: boolean;
}

export interface FormGroupProps<F> extends FormProps<F> {
  readOnly?: boolean;
  groupList: GroupListItemType<F>[];
}
