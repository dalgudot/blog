import { uuid } from '../../lib/utils/id';

export interface IPostId {
  createPostId: () => string;
}

export class PostId implements IPostId {
  private postId: string;

  constructor() {
    this.postId = uuid();
  }

  createPostId() {
    const postId = this.postId;
    return postId;
  }
}
