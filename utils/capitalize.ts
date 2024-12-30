function capitalize(value: string): string;
function capitalize(value: undefined): undefined;
function capitalize(value: string | undefined): string | undefined;
function capitalize(value: string | undefined) {
  if (!value) {
    return value;
  }
  return `${value[0].toUpperCase()}${value.slice(1)}`;
}

export default capitalize;
