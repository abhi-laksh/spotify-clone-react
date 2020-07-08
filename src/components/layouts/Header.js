import React from 'react';
import Nav from './Nav';
class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isTop: true
        }
    }
    handleScroll = () => {
        const isTop = window.scrollY < 5;
        if (isTop !== (this.state.isTop)) {
            this.setState({
                isTop: isTop
            })
        }
    }
    componentDidMount() {
        document.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
    }
    render() {
        return (
            <header id="header-index" className={"header" + (!(this.state.isTop) ? " header-fix" : "")}>
                <Nav />
            </header>
        );
    }
}

export default Header;