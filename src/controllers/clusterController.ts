import { Request, Response } from 'express';
import Cluster from '../models/Cluster';

class ClusterController {

    public async getClusters(req: Request, res: Response){
        //Returns the list of all the clusters
        try{
            let clusters = await Cluster.find();
            res.status(200).json(clusters);     //We consider that an empty list is a valid return (no Clusters in it)
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json(`${error}`);
        }
    }

    public async getCluster(req: Request, res: Response){
        //Returns the details of a specific Cluster
        try{   
            let cluster = await Cluster.findById(req.params.clusterid);
            if(!cluster){
                console.log(`\nCluster with id ${req.params.clusterid} not found`);
                res.status(404).json(`Cluster with id ${req.params.clusterid} not found`);
            }
            else
                res.status(200).json(cluster);
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json(`${error}`);
        }
    }

    public async addCluster(req: Request, res: Response){
        try{
            let {name, description, reportdate} = req.body;
            let newCluster = new Cluster ( {name, description, reportdate} );
            await newCluster.save();
            console.log(`\nAdded Cluster:\n ${newCluster}`);
            res.status(201).json(newCluster); 
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json(`${error}`); 
        }
    }

    public async editCluster(req: Request, res: Response){
        try{
            let {name, description, reportdate} = req.body;
            let checkCluster = await Cluster.findById(req.params.clusterid);
            if(checkCluster){
                await Cluster.findOneAndUpdate( {'_id':req.params.clusterid}, {$set:{"name": req.body.name, "description": req.body.description}, "reportdate": req.body.reportdate }, {new: true}).then((updatedCluster) => {
                    console.log(`Cluster with id ${req.params.clusterid} modified: ${updatedCluster}`);
                    res.status(201).json(updatedCluster);
                })
            }
            else{
                console.log(`Cluster with id ${req.params.clusterid} not found`);
                res.status(404).json(`Cluster with id ${req.params.clusterid} not found`);
            }
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json(`${error}`); 
        }
    }

}

const controller: ClusterController = new ClusterController();
export default controller;