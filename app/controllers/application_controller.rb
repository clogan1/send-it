class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  private

  def authorize
    return render json: { error: ["Not authorized"]}, status: :unauthorized unless session.include? :user_id
  end

  def artist_authorize
    artist_role = Role.find_by(name: "Artist")
    user = User.find_by(id: session[:user_id])
    return render json: {error: ["You are not an Artist"]}, status: :unauthorized unless user.role_id == artist_role.id
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response(exception)
    render json: { error: "#{exception.model} not found" }, status: :not_found
  end

end
