class SearchesController < ApplicationController
    def index
        @memos = Memo.where('content LIKE(?)', "%#{params[:memoData]}%")

        respond_to do |format|
            format.html { redirect_to :root }
            format.json { render json: @memos }
        end
    end
end