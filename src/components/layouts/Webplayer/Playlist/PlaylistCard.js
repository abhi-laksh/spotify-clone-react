import React from 'react';
import pl2 from '../../../../assets/images/pl2.jpg';

const PlaylistCard = ({ onClick, title, empty, onEdit, onDelete, onAddSong }) => {
    return (
        <div className="col-sm-2">
            <div className="playlist p-3">
                <button className="playlist-btn" onClick={onClick} >
                    {
                        empty ? (
                            <>
                                <div className="playlist-thumbnail border border-primary2 noHover" style={{
                                    height: 140,
                                    position: "relative"
                                }}>
                                    <span>
                                        <i className="fas fa-plus-circle absoluteCenter  text-primary2"></i>
                                    </span>
                                </div>

                                <h3 title={title} className={`playlist-name text-grey text-capitalize`}>
                                    {title}
                                </h3>
                            </>
                        ) : (
                            <>
                                <div className="playlist-thumbnail noBlur" >
                                    <img src={pl2} alt="" />
                                    <div className="d-flex playlist-thumbnail-action-wrapper justify-content-between align-items-center">
                                        <button
                                            className="playlist-thumbnail-action p-2"
                                            onClick={onAddSong}
                                        >
                                            <i className="fas fa-music text-secondary2"></i>
                                            <i className="fas fa-plus sub-icon ml-1 text-secondary2"></i>
                                        </button>
                                        <button
                                            className="playlist-thumbnail-action p-2"
                                            onClick={onEdit}
                                        >
                                            <i class="fas fa-edit text-secondary2"></i>
                                        </button>
                                        <button
                                            className="playlist-thumbnail-action p-2"
                                            onClick={onDelete}
                                        >
                                            <i class="far fa-trash-alt text-secondary2"></i>
                                        </button>
                                    </div>
                                </div>
                                <h3 title={title} className={`playlist-name text-grey text-capitalize`}>
                                    {title}
                                </h3>
                            </>
                        )
                    }
                </button>
            </div >
        </div >
    )
}

export default PlaylistCard
