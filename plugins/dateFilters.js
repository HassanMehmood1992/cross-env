import Vue from "vue";
import moment from "moment";
export default ({ app }) => {
  let fullDate = "DD MMM YYYY";
  let fullDateTime = "DD MMM YYYY [at] HH:mm";
  let dateTime = "DD MMM [at] HH:mm";

  // isShortForm: the param is used if want to render the year
  Vue.filter("dateRange", (fromDate, toDate, isShortForm) => {
    let yearOption = isShortForm ? "" : " YYYY";
    if (toDate == null) {
      return fromDate
        ? moment(fromDate)
            .format("DD MMM" + yearOption)
            .toString()
        : null;
    } else if (fromDate != null) {
      if (
        moment(fromDate).format("MM") != moment(toDate).format("MM") &&
        moment(fromDate).format("YYYY") == moment(toDate).format("YYYY")
      ) {
        return (
          moment(fromDate).format("DD MMM") +
          " - " +
          moment(toDate).format("DD MMM" + yearOption)
        );
      } else if (
        moment(fromDate).format("DD MMM") === moment(toDate).format("DD MMM")
      ) {
        return moment(fromDate).format("DD MMM" + yearOption);
      } else if (
        moment(fromDate).format("MMM YYYY") ===
        moment(toDate).format("MMM YYYY")
      ) {
        return (
          moment(fromDate).format("DD[-]") +
          moment(toDate).format("DD ") +
          moment(fromDate).format("MMM" + yearOption)
        );
      } else {
        return (
          moment(fromDate).format("DD MMM" + yearOption) +
          " - " +
          moment(toDate).format("DD MMM" + yearOption)
        );
      }
    } else {
      return "-";
    }
  });

  // Default format : DD MMM YYYY
  Vue.filter("fullDate", date => {
    return date ? moment(date).format(fullDate) : "";
  });

  // Default format : DD MMM YYYY [at] HH:mm
  Vue.filter("fullDateTime", date => {
    return date
      ? moment
          .utc(date)
          .local()
          .format(fullDateTime)
      : "";
  });

  // Default format : DD MMM [at] HH:mm
  Vue.filter("dateTime", date => {
    return date
      ? moment
          .utc(date)
          .local()
          .format(dateTime)
      : "";
  });

  // Default format : HH:mm
  Vue.filter("time", date => {
    return date
      ? moment
          .utc(date)
          .local()
          .format("HH:mm")
      : "";
  });

  Vue.filter("fromNow", val => {
    moment.updateLocale("en", {
      calendar: {
        sameDay: `[${moment.utc(val).fromNow()}]`,
        nextDay: "DD/MM/YYYY [at] HH:mm",
        nextWeek: "DD/MM/YYYY [at] HH:mm",
        lastDay: `[Yesterday at ${moment
          .utc(val)
          .local()
          .format("HH:mm")}]`,
        lastWeek: "DD/MM/YYYY [at] HH:mm",
        sameElse: "DD/MM/YYYY [at] HH:mm"
      }
    });
    return moment(val).calendar();
  });

  Vue.filter("fromNowTime", val => {
    moment.updateLocale("en", {
      calendar: {
        sameDay: `[${moment.utc(val).fromNow()}]`,
        lastDay: `[Yesterday at ${moment
          .utc(val)
          .local()
          .format("hh:mm A")}]`,
        lastWeek: "hh:mm A",
        sameElse: "hh:mm A"
      }
    });
    return moment(val).calendar();
  });
};
