class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login(user)
    @current_user = user
    session[:session_token] = user.reset_token!
  end

  def logged_in?
    !!current_user
  end

  def logout
    current_user.reset_token!
    session[:session_token] = nil
  end

  def require_logged_in
    render json: [
        "Your login information was incorrect."
      ], status: 401 if !current_user
  end

end
