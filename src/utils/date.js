import moment from 'moment';

export const formatDateTime = (date) => moment(date).format("Do MMMM YYYY @ HH:mm");
export const formatDateTimeNumeric = (date) => moment(date).format("DD/MM/YYYY HH:mm");
export const formatDateForBackend = (date) => moment(date).format("DD/MM/YYYY");
export const formatDD_MM_hh_mm = (date) => moment(date).format("DD/MM hh:mm");
export const formatDateForInputFields = (date, splitter = '/') => moment(date, `DD${splitter}MM${splitter}YYYY`).format('YYYY-MM-DD');
