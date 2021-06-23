import React, { useState, useEffect } from 'react'
import CandidatePhotoService from '../services/candidatePhotoService'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
        biography: {
                padding: 16
        },
        noInfo: {
                display: 'flex',
                justifyContent: 'center',
                color: '#ff0000',
                padding: 15
        },
})


function Biography({ candidateId }) {


        const [info, setInfo] = useState([])
        const [isLoading, setLoading] = useState(true)
        const classes = useStyles()

        useEffect(() => {

                let candidatePhotoService = new CandidatePhotoService()
                candidatePhotoService.getById(candidateId).then((result) => {
                        setInfo(result.data.data)
                        setLoading(false)
                })

                console.log(info)

        }, [])

        if (isLoading) {
                return (
                        <div>
                                Yükleniyor...
                        </div>

                )
        }

        if (!info) {
                return (
                        <div>
                                Bilgi yok
                                Bilgi yok
                        </div>
                )
        }


        if (info.length == 0) {
                return (
                        <div className={classes.noInfo}>
                                <Typography>
                                       BİYOGRAFİ BİLGİSİ BULUNAMADI
                                </Typography>
                        </div>
                )
        }

        return (
                <Typography
                        className={classes.biography}
                >
                        {info[0].preface}
                </Typography>
        )
}

export default Biography
