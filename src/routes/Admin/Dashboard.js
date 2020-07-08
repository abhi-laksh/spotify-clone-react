import React from 'react';
import Layout from '../../components/layouts/Admin/Layout';
import underConstruc from '../../assets/images/under_construction.svg';

function Dashboard(props) {
    return (
        <Layout title="Dashboard" titleClass="d-none">
            <div className="row no-gutters pt-5">
                <div className="col-md-7 m-auto text-center">
                    <img src={underConstruc} alt="" style={{
                        width: "50%"
                    }} />
                    <h1 className="text-grey">Under Construction ! But, you can do stuffs like:-</h1>
                    <h4 className="text-grey text-capitalize">
                        Add, Edit , Delete -
                        <span className="text-secondary2 ml-2">songs</span>,
                        <span className="text-secondary2 ml-2">Artists</span>,
                        <span className="text-secondary2 ml-2">moods</span>,
                        <span className="text-secondary2 ml-2">genres</span>
                    </h4>
                    <h5 className="text-grey">{"<<<"}<span className="text-secondary2">  Check Out</span> Side Menu</h5>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;