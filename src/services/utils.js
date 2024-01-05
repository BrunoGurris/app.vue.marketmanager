export function formatDateUtils(date) {
  const newDate = new Date(date);
  const day = String(newDate.getDate()).padStart(2, '0');
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const year = String(newDate.getFullYear());
  return `${day}/${month}/${year}`;
}

export function formatDateTimeUtils(date) {
  const newDate = new Date(date);
  const day = String(newDate.getDate()).padStart(2, '0');
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const year = String(newDate.getFullYear());
  const hours = String(newDate.getHours()).padStart(2, '0');
  const minutes = String(newDate.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function formatKeyUtils(key) {
  const text = key.slice(-12)
  return '... ' + text.replace(/(.{4})/g, "$1 ")
}

export function formatCurrencyUtils(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}