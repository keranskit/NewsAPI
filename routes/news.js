const express = require('express');
const { $where } = require('../models/NewsModel');
const router = express.Router();
const NewsModel = require('../models/NewsModel');

//Returns all news
router.get('/', async (req,res) => {
    try{
        const news = await NewsModel.find();
        res.json(news);
    }
    catch(err){
        res.json({message: err});
    }
});

//Creates news
router.post('/', async (req, res) =>
{
    const newsModel = new NewsModel(
        {
            title: req.body.title,
            description: req.body.description,
            text: req.body.text
        }
    );
    
    try{
        const savedNews = await newsModel.save();
        res.json(savedNews);
    }
    catch(err){
        res.json({message: err});
    }
});

//Returns all news, sorted by date ascending
router.get('/orderByDateAsc', async (req, res) =>
{
    try{
        const news = await NewsModel.find().sort({"date": 1});
        res.json(news);
    }
    catch(err){
        res.json({message: err});
    }
});

//Returns all news, sorted by date descending
router.get('/orderByDateDesc', async (req, res) =>
{
    try{
        const news = await NewsModel.find().sort({"date": -1});
        res.json(news);
    }
    catch(err){
        res.json({message: err});
    }
});

//Returns all news, sorted by title ascending
router.get('/orderByTitleAsc', async (req, res) =>
{
    try{
        const news = await NewsModel.find().sort({"title": 1});
        res.json(news);
    }
    catch(err){
        res.json({message: err});
    }
});

//Returns all news, sorted by title descending

router.get('/orderByTitleDesc', async (req, res) =>
{
    try{
        const news = await NewsModel.find().sort({"title": -1});
        res.json(news);
    }
    catch(err){
        res.json({message: err});
    }
});

//Returns all news in a given period of time
//Takes two parameters in the query string: startdate and enddate, both with YYYY-MM-DD format.
router.get('/getByDate', async (req, res) =>
{
    try {
        const startdate = req.query.startdate;
        const enddate = req.query.enddate;

        const news = await NewsModel.find({ 
        date: {
            $gte: new Date(new Date(startdate).setHours(00, 00, 00)),
            $lt: new Date(new Date(enddate).setHours(23, 59, 59, 999))
             }
      }).sort({ date: 'asc'})  ;
      console.log(news);
       res.json(news);
     }
     catch(err){
        res.json({message: err});
    }
});

//Returns all news starting with a given letter.
//Takes one parameter in the query string: letter. Case insensitive.
router.get('/getByTitle', async (req, res) =>
{
    try {
        const letter = req.query.letter;
        const news = await NewsModel.find({ 
            "title": {$regex: '^' + letter, $options: 'i'}
      }).sort({ title: 'asc'})  ;
       res.json(news);
     }
     catch(err){
        res.json({message: err});
    }
});

//Returns news by ID
router.get('/:newsId', async (req, res) =>
{
    try{
        const news = await NewsModel.findById(req.params.newsId);
        res.json(news);
    }
    catch(err){
        res.json({message: err});
    }
});

//Changes news by given ID
router.patch('/:newsId', async (req, res) =>
{
    try{
        const updatedNews = await NewsModel.updateOne({_id: req.params.newsId}, 
            {$set: {
                title: req.body.title,
                description: req.body.description,
                text: req.body.text
            }});
        res.json(updatedNews);
    }
    catch(err){
        res.json({message: err});
    }
});

//Deletes news by given ID
router.delete('/:newsId', async (req, res) =>
{
    try{
        const removedNews = await NewsModel.remove({_id: req.params.newsId});
        res.json(removedNews);
    }
    catch(err){
        res.json({message: err});
    }
});

module.exports = router;