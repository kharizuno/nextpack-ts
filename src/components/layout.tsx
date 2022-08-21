import { withRouter } from 'next/router'

import Meta from './partial/meta';

const Layout = (props: any) => {
    return (
        <div>
            <Meta/>
            {props.children}
        </div>
    )
}

export default withRouter(Layout);