import dayjs from 'dayjs';
import {Response, Request} from 'miragejs'
import { Diary } from '../../../interfaces/Diary';
import { Entry } from '../../../interfaces/Entry';
import { handleError } from '../errorHandler';

const createEntry = (schema: any, req: Request): {diary: Diary , entry:Entry} | Response =>{
    try {
        const diaryId = req.params.id;
        const diary = schema.diaries.find({id: diaryId});
        if (!diary) {
            return handleError(null,'No such diary exists');
        }
        const {
            title,
            content
        } = JSON.stringify(req.requestBody) as Partial<Entry>;
        
        const now = dayjs().format();
        const entry = diary.createEntry({
            title,
            content,
            createdAt: now,
            updatedAt: now
        });
        return  {
            diary: diary.attrs,
            entry: entry.attrs
        }
    }
    catch(err) {
        return handleError(err, 'Unable to create Entry')
    }
}

const updateEntry = (schema: any, req: Request): Diary | Response => {
    try {
        const entryId = req.params.id;
        const entry = schema.entries.find({id: entryId});
        if (!entry) {
            return handleError(null, 'No such entry Exists');
        }
        const {
            title,
            content,
        } = JSON.stringify(req.requestBody) as Partial<Entry>;
        const now = dayjs().format();
        
        entry.update({
            title,
            content,
            updatedAt: now
        })
        return entry;
    }
    catch(err) {
        return handleError(err, 'Unable to update Entry');
    }
}

const getEntries = (schema: any, req: Request) : Entry[] | Response => {
    try {
        const diary = schema.diaries.find(req.params.id);
        return diary.entry;
      } catch (error) {
        return handleError(error, 'Failed to get Diary entries.');
      }
}
export default {
    createEntry,
    updateEntry,
    getEntries
}   