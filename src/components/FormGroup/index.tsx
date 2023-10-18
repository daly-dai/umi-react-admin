import {
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Slider,
  Switch,
  TimePicker,
  TreeSelect,
  Typography,
  Upload,
  Table,
} from 'antd';
import { useMemo } from 'react';

import styles from './index.less';
import type {
  FieldListItemType,
  FormGroupProps,
  FormGroupRowProps,
} from './types';

const { Dragger } = Upload;

export const FormTableFieldComponent = {
  input: Input,
  inputnumber: InputNumber,
  select: Select,
  textarea: Input.TextArea,
  slider: Slider,
  radio: Radio,
  switch: Switch,
  treeselect: TreeSelect,
  upload: Upload,
  uploaddragger: Dragger,
  datepicker: DatePicker,
  datepickerrange: DatePicker.RangePicker,
  timepicker: TimePicker,
  timepickerrange: TimePicker.RangePicker,
  checkbox: Checkbox,
  cascader: Cascader,
  table: Table,
};

const FormTypeItem = <F,>(
  props: (FieldListItemType<F, true> | FieldListItemType<F, false>) & {
    readOnly?: boolean;
  },
) => {
  const {
    isList,
    colProps,
    name,
    label,
    formItemProps,
    fieldType,
    fieldChildren,
    fieldProps,
    readOnly,
    formListChildren,
    formListProps,
    extraContent: ExtraContent,
  } = props;
  const Tag = props.fieldComponent as any;

  if (isList) {
    return (
      <Col
        {...colProps}
        span={colProps?.span || 24}
        className={`${colProps?.className}`}
      >
        <Form.List name={name!} {...formListProps}>
          {formListChildren!}
        </Form.List>
        {ExtraContent}
      </Col>
    );
  }
  return (
    <Col
      {...colProps}
      span={colProps?.span || 9}
      className={`${colProps?.className}`}
    >
      {fieldType !== false && (
        <Form.Item
          name={name}
          label={label}
          {...formItemProps}
          className={`${formItemProps?.className}`}
        >
          {fieldChildren ? (
            <Tag
              readOnly={readOnly}
              disabled={readOnly}
              bordered={!readOnly}
              {...fieldProps}
              className={`${styles.field} ${fieldProps?.className}`}
            >
              {fieldChildren}
            </Tag>
          ) : (
            <Tag
              readOnly={readOnly}
              disabled={readOnly}
              bordered={!readOnly}
              {...fieldProps}
              className={`${styles.field} ${fieldProps?.className}`}
            />
          )}
        </Form.Item>
      )}
      {ExtraContent}
    </Col>
  );
};

const RowItem = <F,>(props: FormGroupRowProps<F>) => {
  const { row, readOnly } = props;

  const fieldListMemo = useMemo(
    () =>
      row.fieldList?.map((item) => {
        let fieldComponent;
        if (item.fieldType) {
          fieldComponent = FormTableFieldComponent[item.fieldType]
            ? FormTableFieldComponent[item.fieldType]
            : Input;
        } else if (item.fieldComponent) {
          fieldComponent = item.fieldComponent;
        } else if (item.fieldType === false) {
          fieldComponent = Input;
        } else {
          fieldComponent = Input;
        }
        return {
          ...item,
          fieldComponent,
        };
      }),
    [row.fieldList],
  );

  return (
    <Row
      {...row.rowProps}
      className={`${styles.section} ${row.rowProps?.className}`}
    >
      <Typography.Title level={5} className={styles.title}>
        {row.title}
      </Typography.Title>
      {fieldListMemo?.map((fieldItem, index) => (
        <FormTypeItem
          {...fieldItem}
          key={fieldItem.key || index}
          readOnly={readOnly}
        />
      ))}
    </Row>
  );
};

const FormGroup = <F,>(props: FormGroupProps<F>) => {
  const { groupList, readOnly, ...formProps } = props;

  return (
    <Form<F>
      colon={false}
      {...formProps}
      className={`${styles.form} ${formProps?.className}`}
    >
      {groupList.map((row, index) => (
        <RowItem<F> key={row.key || index} row={row} readOnly={readOnly} />
      ))}
    </Form>
  );
};

export default FormGroup;
