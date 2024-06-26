import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { QuestionService } from "./question.service";
import { Question } from "./model/question.model";
import { CreateQuestionInput } from "./dto/create-question.input";

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => [Question], { name: "questions" })
  findAll() {
    return this.questionService.findAll();
  }

  @Query(() => Question, { name: "question" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.questionService.findOne(id);
  }

  @Mutation(() => Question)
  createQuestion(
    @Args("createQuestionInput") createQuestionInput: CreateQuestionInput,
  ) {
    return this.questionService.create(createQuestionInput);
  }

  @Mutation(() => Question)
  removeQuestion(@Args("id", { type: () => Int }) id: number) {
    return this.questionService.remove(id);
  }
}
