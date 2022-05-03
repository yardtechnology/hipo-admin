import { FormControl, MenuItem, Select, TextField } from "@mui/material";
// import from other files
import { countries } from "configs";

const CustomPhoneNumberPicker = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  countryCode,
  onChangeCountryCode,
  name,
  countryCodeName,
  onBlur,
  type,
}) => {
  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      sx={{ mt: "2.7vh" }}
      label={label}
      required={true}
      placeholder={placeholder}
      variant="outlined"
      type={type}
      fullWidth
      value={value}
      onChange={onChange}
      name={name}
      error={error}
      helperText={helperText}
      onBlur={onBlur}
      InputProps={{
        startAdornment: (
          <div>
            <FormControl>
              <div>
                <Select
                  value={countryCode}
                  onChange={onChangeCountryCode}
                  autoWidth
                  variant="standard"
                  disableUnderline
                  name={countryCodeName}
                >
                  {countries?.map((country) => (
                    <MenuItem key={country?.code} value={`+${country?.phone}`}>
                      {`+${country?.phone}`}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </FormControl>
          </div>
        ),
      }}
    />
  );
};

export default CustomPhoneNumberPicker;
