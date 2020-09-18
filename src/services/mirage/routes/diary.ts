import dayjs from 'dayjs';
import {Response, Request} from 'miragejs';
import { Diary } from '../../../interfaces/Diary';
import { User } from '../../../interfaces/User';
import { handleError } from '../errorHandler';
const createDiary = (schema : any , req: Request) : {user: User, diary: Diary} | Response => {
    try {

        const id = req.params.id;
        const user = schema.users.find(id);
        const {
            title,
            category
        } = JSON.parse(req.requestBody) as Partial<Diary>;

        if(!user) {
            return handleError(null, "No such user exists");
        }
        const now = dayjs().format();
        const diary = user.createDiary({
            title,
            category,
            entryIds : [],
            updatedAt : now,
            createdAt : now
        });
        return  {
            user: user.attrs,
            diary: diary.attrs
        }
    }
    catch(err) {
        return handleError(err, 'Failed to create Diary');
    }
}


const updateDiary = (schema : any , req: Request) : {user: User, diary: Diary} | Response => { 
    try {
        const id = req.params.id;
        const diary = schema.diaries.find({id});
        const {
            title,
        } = JSON.parse(req.requestBody) as Partial<Diary> ;
        const now = dayjs().format();
        if ( !diary ) {
            return handleError(null, 'No such diary exists');
        }
        diary.update({
            title,
            updatedAt: now
        })
        return diary;
    }
    catch(err) {
        return handleError(err,'Unable to updateDiary');
    }
}

export const getDiaries = (schema: any, req: Request): Diary[] | Response => {
    try {
      const user = schema.users.find(req.params.id);
      return user.diary as Diary[];
    } catch (error) {
      return handleError(error, 'Could not get user diaries.');
    }
  };

export default {
    createDiary,
    updateDiary,
    getDiaries
}