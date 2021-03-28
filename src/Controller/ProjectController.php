<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\ProjectTaskRel;
use App\Entity\Projects;
use App\Entity\Tasks;
use Symfony\Component\HttpKernel\Exception\HttpException;

use App\Service\Project;



class ProjectController extends AbstractController{
    
    private $project;
    
    
    public function __construct(Project $project){
        
        $this->project = $project;
    }
    
    /**
     * @route("/user_projects/{id}", name="user_projects", methods={"GET"})
     */
    public function getProjects(Request $request, $id){
        
        $projectList = $this->project->getProjects($id);
        
        $response = new JsonResponse($projectList);
        
        return $response;
    }
    
    /**
     * @route("/project/task_add", name="project_task_add", methods={"POST"})
     */
    public function addTaskToProject(Request $request){
        
        $postData = [];
        
        if($content = $request->getContent()){
            
            $postData = json_decode($content,true);
        }
        
        $em = $this->getDoctrine()->getManager();
      
        $em->beginTransaction();
        
        try{
      
            foreach ($postData as $value) {
              
                $projectTask= new ProjectTaskRel();
                $project = $this->getDoctrine()->getRepository(Projects::class)->findOneBy(array('id' => $value['project']));
                $task = $this->getDoctrine()->getRepository(Tasks::class)->findOneBy(array('id' => $value['task']));
                $projectTask->setProject($project);
                $projectTask->setTask($task);
                $projectTask->setActive(true);
                $em->persist($projectTask);
                $em->flush();
            } 
            $em->commit();
            
        } catch (\Exception $e) {
            $em->rollBack();
            throw $e;
        }
        
        $response = new JsonResponse('Records created',201);
        
        
        return($response);    
    } 
}