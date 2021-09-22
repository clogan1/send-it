class TemplatesController < ApplicationController
    before_action :artist_authorize, only: :create

    def index
        render json: Template.all
    end

    # artists only
    def create
        template = Template.create!(template_params)
        render json: template, status: :created
    end

    # temporary so I could update db
    # def update
    #     template = Template.find(params[:id])
    #     template.update!(template_params)
    #     render json: template, status: :accepted
    # end

    private 

    def template_params
        params.permit(:name, :category_id, :art_url, :artist_name)
    end
end
