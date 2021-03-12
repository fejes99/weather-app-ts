import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface Props {
  onSubmit: () => void;
  onChange: (newValue: string) => void;
  text: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })
);

const Search = (props: Props) => {
  const classes = useStyles();

  type HandleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  const handleChange: HandleChange = (event) => {
    props.onChange(event.target.value);
  };

  type OnFormSubmit = (event: { preventDefault: () => void }) => void;
  const onFormSubmit: OnFormSubmit = (event) => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={(event) => onFormSubmit(event)}>
        <TextField
          onChange={(event) => handleChange(event)}
          type="text"
          name="city"
          value={props.text}
          label="City name"
        />
      </form>
    </div>
  );
};

export default Search;
