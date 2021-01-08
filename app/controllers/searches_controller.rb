class SearchesController < ApplicationController
    def index
        scope = Memo.all
        words = JSON.parse(params[:memoData])

        search_sql = []

        words = words.map do |n|
            search_sql.push('content LIKE (?)')
            "%#{n}%"
        end 

        @memos = scope.where( search_sql.join(' or '), *words )

        # @memos = Memo.where('content LIKE(?)', "%#{params[:memoData]}%")

        respond_to do |format|
            format.html { redirect_to :root }
            format.json { render json: @memos }
        end
    end
end