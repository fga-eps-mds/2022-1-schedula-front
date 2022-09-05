export type dateFormats = "date" | "time"

export const formatDate = (
  date: Date | number | string,
  format: dateFormats = "date",
  locale = "pt-BR"
): string => {
  const formatMap: Record<dateFormats, Intl.DateTimeFormatOptions> = {
    date: {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    },
    time: {
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    }
  }

  try {
    const formatedDate = new Intl.DateTimeFormat(
      locale,
      formatMap[format] as Intl.DateTimeFormatOptions
    ).format(new Date(date))

    return formatedDate
  } catch (error) {
    return "--/--/----"
  }
}
