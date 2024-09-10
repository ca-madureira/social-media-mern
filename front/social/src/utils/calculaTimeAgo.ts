const calculateTimeAgo = (dateString: string): string => {
  const postDate: Date = new Date(dateString);
  const now: Date = new Date();
  const differenceInSeconds: number = Math.floor(
    (now.getTime() - postDate.getTime()) / 1000,
  );

  const minutes: number = Math.floor(differenceInSeconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);

  if (days > 0) {
    return `há ${days} dia${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `há ${hours} hora${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  } else {
    return 'há poucos segundos';
  }
};

export default calculateTimeAgo;
