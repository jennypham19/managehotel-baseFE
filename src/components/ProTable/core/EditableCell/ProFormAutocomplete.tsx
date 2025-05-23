import { useEffect, useRef } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FilterOptionsState, FormControl } from '@mui/material';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ProFormLabel from '@/components/ProForm/ProFormLabel';

interface Value<T> {
  key: string | number;
  label: string;
  value: T;
  disabled: boolean;
}

export interface FormAutoComplete<O extends FieldValues, V extends string | number>
  extends Omit<TextFieldProps, 'name' | 'onSelect'> {
  name: string;
  options?: O[];
  renderLabel?: (option: O) => string | JSX.Element;
  renderValue?: (option: O) => V;
  getOptionDisabled?: (option: O) => boolean;
  onSelect?: (value: V) => void;
  placeholder?: string;
  actionText?: string | React.ReactNode;
  filterOptions?: ((options: V[], state: FilterOptionsState<V>) => V[]) | undefined;
  autoCompleteProps?: Partial<AutocompleteProps<V, false, false, false>>;
}

const ProFormAutocomplete = <O extends FieldValues, V extends string | number>(
  props: FormAutoComplete<O, V>,
) => {
  const {
    name,
    label,
    options = [],
    renderLabel = (option) => option.label,
    renderValue = (option) => option.value,
    disabled,
    placeholder = '',
    actionText,
    getOptionDisabled,
    onSelect,
    required,
    filterOptions,
    autoCompleteProps,
    ...rest
  } = props;

  const { t } = useTranslation('common');
  const selectRef = useRef<HTMLInputElement>(null);
  const { control, setValue } = useFormContext();

  const {
    field: { value, onChange, ...others },
    fieldState: { error },
  } = useController({ name, control });

  const entries = options?.reduce<Map<string | number, Value<V>>>((acc, option, i) => {
    const value = renderValue(option);
    const label = renderLabel(option);
    const disabled = getOptionDisabled?.(option) || false;
    acc.set(value, { value, label, disabled, key: i });
    return acc;
  }, new Map());

  // Rollback
  useEffect(() => {
    if (!entries?.size || entries.has(value) || value === null) {
      return;
    }
    setValue(name, null);
  }, [value, entries, name, setValue]);

  const handleLabelClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  return (
    <FormControl fullWidth error={Boolean(error)} disabled={disabled}>
      <ProFormLabel
        name={name}
        title={label as string}
        required={required}
        gutterBottom
        onClick={handleLabelClick}
      >
        <Autocomplete<V, false>
          id={name}
          disabled={disabled}
          multiple={false}
          {...(disabled && {
            forcePopupIcon: false,
          })}
          ListboxProps={{
            style: { maxHeight: 36 * 5 + 16, overflowY: 'auto' },
          }}
          options={options?.map(renderValue) ?? []}
          filterOptions={filterOptions}
          getOptionLabel={(option) => entries.get(option)?.label || ''}
          noOptionsText={!options?.length && !actionText ? t('no_option') : actionText}
          getOptionDisabled={(option) => entries.get(option)?.disabled || false}
          renderInput={(params) => (
            <TextField
              error={Boolean(error)}
              helperText={error?.message && t(error.message)}
              placeholder={disabled ? void 0 : placeholder}
              {...params}
              {...rest}
            />
          )}
          renderOption={(props, option) => (
            <Box component='li' {...props} key={option}>
              <Typography variant='subtitle2'>{entries.get(option)?.label}</Typography>
            </Box>
          )}
          {...others}
          value={entries?.has(value) ? value : null}
          onChange={(_event, value) => {
            onChange(value);
          }}
          ref={selectRef}
          {...autoCompleteProps}
        />
      </ProFormLabel>
    </FormControl>
  );
};

export default ProFormAutocomplete;
