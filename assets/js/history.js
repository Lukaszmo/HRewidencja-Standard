import { createBrowserHistory } from 'history'
const customHistory = createBrowserHistory({
    basename: process.env.PUBLIC_URL || ''
});
export default customHistory;
