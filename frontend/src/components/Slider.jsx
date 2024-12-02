import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';

function valueText(value) {
  return value;
}

export default function StepsSlider({ temperature, setTemperature }) {
  return (
    <Box sx={{ width: 300, display: 'flex', alignItems: 'center'}}>
      <Slider
        aria-label="Small steps"
        defaultValue={0.3}
        value={temperature}
        onChange={(event, newValue) => setTemperature(newValue)}
        getAriaValueText={valueText}
        step={0.1}
        marks
        min={0.1}
        max={1}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
