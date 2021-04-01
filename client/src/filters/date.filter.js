export default function dateFilter(value) {
   if (!value) return value;
   const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
   };

   return new Intl.DateTimeFormat('ru-RU', options)
      .format(new Date(value))
      .replace(/(\d{2}).(\d{2}).(\d{4})/, "$3.$2.$1");
}
