export function pullDateFormat(date: string) {
const parsedDate = new Date(date);
const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
const day = parsedDate.getDate().toString().padStart(2, '0');
const year = parsedDate.getFullYear();

const formattedDate = `${month}-${day}-${year}`;
//console.log(formattedDate); 
return formattedDate;

}


export const formatLastUpdatedTime = (dateString : string) => {
    return new Date(dateString).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    });
  };
