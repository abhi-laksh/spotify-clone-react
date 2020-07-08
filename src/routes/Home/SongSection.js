import React from 'react';
import thumbnail from '../../assets/images/b.jpg';
import { Link } from 'react-router-dom';
function SongSection(props) {
    return (
        <section id="section-song">
            <div className="songs">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-10 m-auto">
                            <h1 className="text-primary2">Looking for music?</h1>
                            <p>
                                Start listening to the best new releases.
                            </p>
                            <Link className="text-uppercase button-border button-border-primary2 button" to="/webplayer">
                                Launch Web Player
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className=" songs-col">
                                <img src={thumbnail} alt="" />
                                <a href="#" className="songs-col-overlay">
                                    <div className="songs-col-caption">
                                        <h2 className="text-white">Liar</h2>
                                        <p>Camila Cabello</p>
                                        <p className="text-secondary2 text-uppercase playLink">play now</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className=" songs-col">
                                <img src={thumbnail} alt="" />
                                <a href="#" className="songs-col-overlay">
                                    <div className="songs-col-caption">
                                        <h2 className="text-white">Liar</h2>
                                        <p>Camila Cabello</p>
                                        <p className="text-secondary2 text-uppercase playLink">play now</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className=" songs-col">
                                <img src={thumbnail} alt="" />
                                <a href="#" className="songs-col-overlay">
                                    <div className="songs-col-caption">
                                        <h2 className="text-white">Liar</h2>
                                        <p>Camila Cabello</p>
                                        <p className="text-secondary2 text-uppercase playLink">play now</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "30px" }}>
                        <div className="col-4">
                            <div className=" songs-col">
                                <img src={thumbnail} alt="" />
                                <a href="#" className="songs-col-overlay">
                                    <div className="songs-col-caption">
                                        <h2 className="text-white">Liar</h2>
                                        <p>Camila Cabello</p>
                                        <p className="text-secondary2 text-uppercase playLink">play now</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className=" songs-col">
                                <img src={thumbnail} alt="" />
                                <a href="#" className="songs-col-overlay">
                                    <div className="songs-col-caption">
                                        <h2 className="text-white">Liar</h2>
                                        <p>Camila Cabello</p>
                                        <p className="text-secondary2 text-uppercase playLink">play now</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className=" songs-col">
                                <img src={thumbnail} alt="" />
                                <a href="#" className="songs-col-overlay">
                                    <div className="songs-col-caption">
                                        <h2 className="text-white">Liar</h2>
                                        <p>Camila Cabello</p>
                                        <p className="text-secondary2 text-uppercase playLink">play now</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SongSection;