import express from 'express';
import validateResource from '../../middleware/validateResource';
import passport from 'passport';
import multer from 'multer';
import { createPlaceSchema } from '../../schema/place.schema';
import {
    addPlace, destroyPlace, getPlace, getPlaces, getUserPlaces, updatePlace, uploadMultipleImages
} from '../../controllers/place.controller';

const router = express.Router();


const MIME_TYPE_MAP: { [key: string]: string; }= {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error : Error | null = new Error("Invalid image type");

        if(isValid) {
            error = null;
        }

        cb(error, 'public/uploads')
    },
    filename : function(req, file, cb) {
        const fileName = file.originalname.split(' ').join('-')
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${ext}`)
    }
})

const uploadOptions = multer({storage: storage})


// @route    /place
// @desc     Get Place index
// @access   Public
router.get('/place',  getPlaces);

// @route    /place/:id
// @desc     Get Place id
// @access   Public
router.get('/place/:id',  getPlace);

// @route    /place
// @desc     Create Place
// @access   Private
router.post('/place', passport.authenticate('jwt', {session:false}), validateResource(createPlaceSchema), addPlace);

// @route    /place
// @desc     Upload multiple images
// @access   Private
router.patch('/upload-images/:id', passport.authenticate('jwt', {session:false}), uploadOptions.array('images', 10), uploadMultipleImages);


// @route    /user-places
// @desc     Get Place index
// @access   Private
router.get('/user-place', passport.authenticate('jwt', {session:false}), getUserPlaces);

// @route    /user-places
// @desc     Get Place index
// @access   Private
router.patch('/place/:id', passport.authenticate('jwt', {session:false}), updatePlace)

// @route    /place/:id
// @desc     Delete place by id
// @access   Private
router.delete('/place/:id', passport.authenticate('jwt', {session:false}), destroyPlace)


export default router;

